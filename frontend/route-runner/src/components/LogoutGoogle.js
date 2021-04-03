import React, { useEffect, useState } from "react";
import { useGoogleLogout } from "react-google-login";
import axios from "axios";
import googleIcon from "../icons/google.svg";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../helpers/actionCreators";
import "../styles/LogoutGoogle.css";
const clientId =
  "1039642844103-gr5uhujf57uobmu1pha83qgj3mctgpjn.apps.googleusercontent.com";

function LogoutGoogle() {
  const dispatch = useDispatch();
  const onLogoutSuccess = (res) => {
    dispatch(logOut());
    alert("Thanks for using Route Runner. See you later✌");
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
    <div onClick={signOut} id="googleSignOutText">
      <img
        src={googleIcon}
        alt="google login"
        className="icon"
        style={{ cursor: "pointer" }}
      ></img>
      <span style={{ cursor: "pointer" }}>Sign out</span>
    </div>
  );
}

export default LogoutGoogle;
