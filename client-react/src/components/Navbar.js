import React from "react";
import { BrowserRouter as Link, Router, Redirect} from "react-router-dom";
import '../bootstrap.min.css';
import logo from "../images/Pomo-Do_logo-233x50.png";

class Navbar extends React.Component {
    signOut = (e) => {
        
        e.preventDefault();
        localStorage.removeItem('usertoken');
        // this.props.history.push(`/signin`);
        return <Redirect to="/signin" />
    
    }

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: 'white' }}>
                    {/* Navbar content */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
                        <i className="fas fa-hamburger"></i>
                        {/* <span className="navbar-toggler-icon"></span> */}
                    </button>
                    <Link to="" className="navbar-brand m-auto"><img src={logo} height="30px" alt="logo" /></Link>
                    <div className="collapse navbar-collapse" id="menu">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item">
                                <Link to="" className="nav-link text-dark h6">Timer</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="" className="nav-link text-dark h6">To-Do</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="" className="nav-link text-dark h6">Settings</Link>
                            </li>
                        </ul>
                    </div>
                    {localStorage.usertoken ? (
                        // <Link to="/signout" className="nav-link h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign Out</Link>
                        <a href="_" onClick={this.signOut} className="nav-link h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign Out</a>
                    ) : (
                            <Link to="/signin" className="nav-link h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign In</Link>
                        )}
                </nav>
            </Router >
        );
    }
}

export default Navbar;
