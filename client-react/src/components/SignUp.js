import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/bootstrap.min.css";
import "../css/style.css";
import logo from "../images/Pomo-Do_logo-icon-50x50.png";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  addUser = (newUser) => {
    return axios.post("/users/signup", {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    })
      .then(response => {
        console.log(response.data)
        return response.data;
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    this.addUser(user).then(response => {
      if (!response) {
        return this.props.history.push(`/signup`);
      } else {
        return this.props.history.push(`/signin`);
      }
    })
  }

  // componentDidMount() {
  // }

  render() {
    return (
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 mt-5">
            {/* <div className="d-flex justify-content-between">
                <a href="#"><img src={logo} height="30px" alt="logo-icon" /></a>
                <a href="#" className="nav-item h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign In</a>
            </div> */}
            <div className="card">
              <div className="card-header d-flex justify-content-between" style={{ backgroundColor: 'white' }}>
                <Link to="/"><img src={logo} height="30px" alt="logo-icon" /></Link>
                <Link to="/signin" className="nav-link h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign In</Link>
              </div>
              <div className="card-body">
                <form noValidate onSubmit={this.onSubmit}>
                  <h1 className="h3 mb-3">Sign Up for Pomo-Do</h1>
                  <div className="form-group">
                    <input type="text" name="username" className="form-control"
                      placeholder="Username" value={this.state.username} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" className="form-control"
                      placeholder="Email" value={this.state.email} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <input type="password" name="password" className="form-control"
                      placeholder="Password" value={this.state.password} onChange={this.onChange} />
                  </div>
                  <button type="submit" onClick={this.onSubmit} className="btn btn-danger-pomodo btn-block">
                    Sign Up
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;