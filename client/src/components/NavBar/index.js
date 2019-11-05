import React from 'react';
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";

const NavBar = (props) => {
  return <Navbar bg="dark" className="px-5" expand="lg">
    <Link className="navbar-brand text-white" to='/dashboard'>Mom's Belief Admin</Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link className="nav-link text-light" to="/home">Home</Link>
        <Link className="nav-link text-light" to="/about-us">About Us</Link>
        <Link className="nav-link text-light" to="/home-based-program">Home Based Program</Link>
        <Link className="nav-link text-light" to="/schools">Schools</Link>
        <Link className="nav-link text-light" to="/centers">Centers</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
};

export default NavBar;