import React, { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginOrSignupButtons from "./LoginOrSignupButtons";
import Map from "./Map";
const Home = () => {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  return (
    <>
      <h3 className="display-3">Route Runner</h3>
      <div className="text-muted">Plan your run today</div>
      <Map />
    </>
  );
};

export default Home;
