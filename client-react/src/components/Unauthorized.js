import React from "react";
import { Link } from "react-router-dom";
import "../css/bootstrap.min.css";
import logo from "../images/Pomo-Do_logo-icon-50x50.png";

const Unauthorized = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card h3">
            <div className="card-header" style={{ backgroundColor: "white" }}>
              <span><img src={logo} style={{ height: "40px", paddingBottom: "10px" }} alt="logo-icon" /></span>ops!
            </div>
            <div className="card-body d-flex align-items-center text-center" style={{ height: "250px" }}>
              <div>
                Please <Link to="/signin" className="text-danger-pomodo" style={{ textDecoration: "none" }}>Sign In</Link> to continue.
            </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}

export default Unauthorized;
