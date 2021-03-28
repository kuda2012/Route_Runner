import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const LoginNormal = () => {
  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {redirect && <Redirect push to="/login" />}
      <button
        onClick={() => {
          setRedirect(true);
        }}
        className="button"
      >
        <span className="buttonText">Sign in w/ Username and Password</span>
      </button>
    </>
  );
};

export default LoginNormal;
