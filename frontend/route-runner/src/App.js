import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loggingInGoogle, authTokenNormal } from "./helpers/actionCreators";
import LoginGoogle from "./components/LoginGoogle";
import Logout from "./components/LogoutGoogle";
import NavBar from "./components/NavBar";
import Router from "./Router";
import "./styles/App.css";

function App() {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  const dispatch = useDispatch();
  useEffect(() => {
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
    <div id="App">
      <NavBar />
      <div id="ContainerForAll">
        <Router />
      </div>
    </div>
  );
}

export default App;
