import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "react-google-login";
import googleIcon from "../icons/google.svg";
import axios from "axios";
import { loggingInGoogle } from "../helpers/actionCreators";
import { useSelector, useDispatch } from "react-redux";
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "1039642844103-gr5uhujf57uobmu1pha83qgj3mctgpjn.apps.googleusercontent.com";

function LoginGoogle() {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   async function verifyLogin() {
  //   }
  //   verifyLogin();
  // });
  const onSuccess = (res) => {
    console.log(res);
    console.log("Login Success: currentUser:", res.profileObj);
    dispatch(loggingInGoogle(res.tokenId));
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

export default LoginGoogle;
