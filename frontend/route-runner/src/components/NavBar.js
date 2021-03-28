import React, { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LogoutGoogle from "../components/LogoutGoogle";
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
  return (
    <Navbar expand="md" className="bg-primary">
      <NavLink to="/" className="navbar-brand">
        Router Runner
      </NavLink>
      <Nav className="ml-auto">
        {/* {!loggedInGoogle && (
          <NavItem>
            <NavLink to="/login" className="nav-link">
              LoginGoogle
            </NavLink>
          </NavItem>
        )} */}
        {loggedInGoogle && (
          <NavItem>
            <LogoutGoogle></LogoutGoogle>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};
export default NavBar;
