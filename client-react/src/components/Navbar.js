import React from "react";
import { Link } from "react-router-dom";
import "../css/bootstrap.min.css";
import "../css/style.css";
import logo from "../images/Pomo-Do_logo-233x50.png";

class Navbar extends React.Component {

  signOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    console.log("Signed Out");
    // return this.props.history.push(`/signin`)
    window.location.reload();
  }

  render() {
    const signOutLink =
      <div class="dropdown">
        <button class="btn dropdown-toggle" type="button" id="signedInUserdropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-user"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="signedInUserdropdown" style={{ left: "-100px" }}>
          <Link to="#" onClick={this.signOut} className="nav-item h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign Out</ Link>
        </div>
      </div>

    const signInLink = <Link to="/signin" className="nav-item h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign In</Link>

    return (
      <nav className="navbar navbar-expand-md navbar-light mb-5" style={{ backgroundColor: 'white' }}>
        {/* Navbar content */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
          <i className="fas fa-ellipsis-v"></i>
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>
        <Link to="/" className="navbar-brand m-auto"><img src={logo} height="30px" alt="logo" /></Link>
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
        {localStorage.usertoken ? signOutLink : signInLink}
      </nav>
    );
  }
}

export default Navbar;
