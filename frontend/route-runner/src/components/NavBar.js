import React, { useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
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
  return (
    <Navbar expand="md" className="bg-primary">
      <NavLink to="/" className="navbar-brand">
        Router Runner
      </NavLink>
      <Nav className="ml-auto">
        <NavItem>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
export default NavBar;
