import React, { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginNormal from "./LoginNormal";
import SignupNormal from "./SignupNormal";
import LoginGoogle from "./LoginGoogle";

const LoginOrSignupButtons = () => {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  return (
    <div id="LoginOrSignupButtons">
      {!loggedInGoogle && !loggedInNormal && <LoginGoogle></LoginGoogle>}
    </div>
  );
};

export default LoginOrSignupButtons;
