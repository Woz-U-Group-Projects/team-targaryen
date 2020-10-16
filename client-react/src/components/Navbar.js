import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/bootstrap.min.css";
import "../css/style.css";
import logo from "../images/Pomo-Do_logo-233x50.png";

class Navbar extends React.Component {

  signOut = (e) => {
    e.preventDefault();

    axios.get("/users/signout")
      .then(() => {
        window.location.reload();
      });

    this.props.signOut()
    console.log("Signed Out");
  }

  render() {
    const signOutLink =
      <div className="dropdown">
        <button className="btn dropdown-toggle" type="button" id="signedInUserDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-user"></i>
        </button>
        <div className="dropdown-menu text-right" aria-labelledby="signedInUserDropdown" style={{ left: "-100px" }}>
          <Link to="#" onClick={this.signOut} className="nav-item h6 text-danger-pomodo" style={{ textDecoration: "none" }}>Sign Out</ Link>
        </div>
      </div>

    const signInLink = <Link to="/signin" className="nav-item h6 text-danger-pomodo" style={{ textDecoration: "none" }}>Sign In</Link>

    return (
      <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: 'white' }}>
        {/* Navbar content */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
          <i className="fas fa-ellipsis-v"></i>
        </button>
        <Link to="/" className="navbar-brand m-auto"><img src={logo} height="30px" alt="logo" /></Link>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <Link to="/timer" className="nav-link text-dark h6" onClick={this.props.isTimerTabActive}>Timer</Link>
            </li>
            <li className="nav-item">
              <Link to="/tasks" className="nav-link text-dark h6">To-Do</Link>
            </li>
            <li className="nav-item">
              <Link to="/timer/settings" className="nav-link text-dark h6" onClick={this.props.isSettingsTabActive}>Settings</Link>
            </li>
          </ul>
        </div>
        {this.props.isSignedIn ? signOutLink : signInLink}
      </nav>
    );
  }
}

export default Navbar;
