import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginGoogle from "./components/LoginGoogle";
import Logout from "./components/LogoutGoogle";
import Home from "./components/Home";
import LoginNormal from "./components/LoginNormal";
import SignupNormal from "./components/SignupNormal";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
const Router = () => {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  console.log(loggedInGoogle);
  return (
    <Switch>
      <Route exact path="/">
        {!loggedInGoogle && !loggedInNormal && <LoginGoogle></LoginGoogle>}
        {!loggedInNormal && !loggedInGoogle && <LoginNormal></LoginNormal>}
        {!loggedInNormal && !loggedInGoogle && <SignupNormal></SignupNormal>}
        {(loggedInGoogle || loggedInNormal) && <Logout></Logout>}
        <Home />
        {/* {loggedInGoogle && <Logout></Logout>} */}
      </Route>
      <Route exact path={!loggedInGoogle && !loggedInNormal ? "/signup" : "/"}>
        {!loggedInGoogle && <LoginGoogle></LoginGoogle>}
        {!loggedInNormal && <LoginNormal></LoginNormal>}
        {!loggedInNormal && <SignupForm></SignupForm>}
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
