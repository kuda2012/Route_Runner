import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "react-google-login";
import googleIcon from "../icons/google.svg";
import axios from "axios";

// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "1039642844103-gr5uhujf57uobmu1pha83qgj3mctgpjn.apps.googleusercontent.com";

function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  useEffect(() => {
    async function verifyLogin() {
      if (loggedIn) {
        const response = await axios.post(
          "http://127.0.0.1:5000/signup/google",
          {
            token: tokenId,
          }
        );
        console.log(response);
      }
    }
    verifyLogin();
  });

  const onSuccess = (res) => {
    console.log(res);
    console.log("Login Success: currentUser:", res.profileObj);
    setTokenId(res.tokenId);
    setLoggedIn(true);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });

  return (
    <button onClick={signIn} className="button">
      <img src={googleIcon} alt="google login" className="icon"></img>
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default Login;
