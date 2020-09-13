import React from "react";
import '../task.min.css';
import logo from "../images/Pomo-Do_logo-700x150.png";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-md navbar-light ml-2 mr-2" style={{ backgroundColor: 'white' }}>
            {/* Navbar content */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                <i class="fas fa-hamburger"></i>
                {/* <span className="navbar-toggler-icon"></span> */}
            </button>
            <a href="#" className="navbar-brand m-auto"><img src={logo} height="30px" alt="logo" /></a>
            <div className="collapse navbar-collapse" id="menu">
                <ul className="navbar-nav m-auto">
                    <li className="nav-item"><a href="#" className="nav-link text-dark">Timer</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-dark">To-Do</a></li>
                    <li className="nav-item"><a href="#" className="nav-link text-dark">Settings</a></li>
                </ul>
            </div>
            <a href="#" className="nav-item" style={{ color: '#FF3939', textDecoration: 'none' }}>Sign In/Out</a>
        </nav>
    );
}

export default Navbar;
