import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup">
        <Login></Login>
        <Logout></Logout>
      </Route>
      <Route exact path="/login">
        <Login></Login>
      </Route>
    </Switch>
  );
};

export default Router;
