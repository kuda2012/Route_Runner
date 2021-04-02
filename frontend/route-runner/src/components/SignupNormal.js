import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const SignupNormal = () => {
  const [redirect, setRedirect] = useState(false);

  return (
    <>
      {redirect && <Redirect push to="/signup" />}
      <button
        onClick={() => {
          setRedirect(!redirect);
        }}
        className="button"
      >
        <span className="buttonText">Sign Up (Not with Google) </span>
      </button>
    </>
  );
};

export default SignupNormal;
