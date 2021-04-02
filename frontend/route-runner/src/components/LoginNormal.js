import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const LoginNormal = () => {
  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {redirect && <Redirect push to="/login" />}
      <button
        onClick={() => {
          setRedirect(!redirect);
        }}
        className="button"
      >
        <span className="buttonText">Sign in (Not with Google) </span>
      </button>
    </>
  );
};

export default LoginNormal;
