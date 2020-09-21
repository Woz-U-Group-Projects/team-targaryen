import React from "react";
import { Link, Router } from "react-router-dom";
import '../bootstrap.min.css';
import logo from "../images/Pomo-Do_logo-233x50.png";

const Navbar = () => {
    return (
        <Router>
            <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: 'white' }}>
                {/* Navbar content */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                    <i className="fas fa-hamburger"></i>
                    {/* <span className="navbar-toggler-icon"></span> */}
                </button>
                <Link to="/timer" className="navbar-brand m-auto"><img src={logo} height="30px" alt="logo" /></Link>
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav m-auto">
                        <li className="nav-item">
                            <Link to="/timer" className="nav-link text-dark h6">Timer</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tasks" className="nav-link text-dark h6">To-Do</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link text-dark h6">Settings</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/signout" className="nav-item h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign In/Out</Link>
                {localStorage.usertoken ? userLink : loginRegLink}
            </nav>
        </Router>
    );
}

export default Navbar;
