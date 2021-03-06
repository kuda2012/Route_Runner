import React from "react";
import { useGoogleLogout } from "react-google-login";
import googleIcon from "../icons/google.svg";
const clientId =
  "1039642844103-gr5uhujf57uobmu1pha83qgj3mctgpjn.apps.googleusercontent.com";

function Logout() {
  const onLogoutSuccess = (res) => {
    console.log("Logged out Success");
    alert("Logged out Successfully ✌");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="button">
      <img src={googleIcon} alt="google login" className="icon"></img>
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;
