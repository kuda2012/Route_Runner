import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import LoginOrSignupButtons from "./components/LoginOrSignupButtons";
const Router = () => {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path={!loggedInGoogle && !loggedInNormal ? "/signup" : "/"}>
        {!loggedInNormal && !loggedInGoogle && <SignupForm></SignupForm>}
      </Route>
      <Route exact path={!loggedInGoogle && !loggedInNormal ? "/login" : "/"}>
        {!loggedInNormal && !loggedInGoogle && <LoginForm></LoginForm>}
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default Router;
