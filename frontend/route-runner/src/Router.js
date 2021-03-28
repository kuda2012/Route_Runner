import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginGoogle from "./components/LoginGoogle";
import Logout from "./components/LogoutGoogle";
import Home from "./components/Home";
import LoginNormal from "./components/LoginNormal";
import LoginForm from "./components/LoginForm";
const Router = () => {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  return (
    <Switch>
      <Route exact path="/">
        {!loggedInGoogle && <LoginGoogle></LoginGoogle>}
        {!loggedInNormal && <LoginNormal></LoginNormal>}
        <Home />
        {/* {loggedInGoogle && <Logout></Logout>} */}
      </Route>
      <Route exact path={!loggedInGoogle && !loggedInNormal ? "/signup" : "/"}>
        {loggedInGoogle && <Logout></Logout>}
        {!loggedInGoogle && <LoginGoogle></LoginGoogle>}
      </Route>
      <Route exact path={!loggedInGoogle && !loggedInNormal ? "/login" : "/"}>
        {loggedInGoogle && <Logout></Logout>}
        {!loggedInGoogle && <LoginGoogle></LoginGoogle>}
        <LoginForm></LoginForm>
      </Route>
    </Switch>
  );
};

export default Router;
