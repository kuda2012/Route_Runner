import React, { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogoutGoogle from "../components/LogoutGoogle";
import { logOut } from "../helpers/actionCreators";
import "../styles/NavBar.css";
import {
  Navbar,
  Nav,
  NavItem,
  Popover,
  PopoverBody,
  PopoverHeader,
  Button,
} from "reactstrap";

const NavBar = () => {
  const loggedInGoogle = useSelector((state) => state.loggedInGoogle);
  const loggedInNormal = useSelector((state) => state.loggedInNormal);
  const dispatch = useDispatch();
  function signOut() {
    dispatch(logOut());
    alert("Thanks for using Route Runner. See you later✌");
  }
  return (
    <Navbar expand="md" className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand">
        Route Runner
      </NavLink>
      <Nav className="ml-auto">
        {!loggedInGoogle && !loggedInNormal && (
          <NavItem>
            <NavLink to="login">Login </NavLink>
          </NavItem>
        )}
        {!loggedInGoogle && !loggedInNormal && (
          <NavItem>
            <NavLink to="signup">Signup </NavLink>
          </NavItem>
        )}
        {loggedInGoogle && (
          <NavItem>
            <LogoutGoogle></LogoutGoogle>
          </NavItem>
        )}
        {loggedInNormal && (
          <NavItem
            style={{ cursor: "pointer" }}
            onClick={() => {
              signOut();
            }}
          >
            Log out
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};
export default NavBar;
