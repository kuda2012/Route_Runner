import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loggingInGoogle, authTokenNormal } from "./helpers/actionCreators";
import LoginGoogle from "./components/LoginGoogle";
import Logout from "./components/LogoutGoogle";
import NavBar from "./components/NavBar";
import Router from "./Router";

function App() {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !loggedInGoogle &&
      !loggedInNormal &&
      localStorage.getItem("token_google") &&
      !localStorage.getItem("token_normal")
    ) {
      dispatch(loggingInGoogle(localStorage.getItem("token_google")));
    }
    if (
      !loggedInGoogle &&
      !loggedInNormal &&
      localStorage.getItem("token_normal") &&
      !localStorage.getItem("token_google")
    ) {
      dispatch(authTokenNormal(localStorage.getItem("token_normal")));
    }
  });
  return (
    <>
      <NavBar />
      <Router />
    </>
  );
}

export default App;
