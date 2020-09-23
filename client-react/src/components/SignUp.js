import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import "../css/bootstrap.min.css";
import "../css/style.css";
import logo from "../images/Pomo-Do_logo-icon-50x50.png";

const required = value => {
  if (!value) {
    return (
      <div className="text-danger-pomodo" role="alert">
        Please fill out this field.
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="text-danger-pomodo" role="alert">
        Please enter a valid email.
      </div>
    );
  }
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      isSignedUp: false,
      message: ""
    };
  }

  addUser = (newUser) => {
    return axios.post("/users/signup", {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    })
      .then(response => {
        console.log(response.data);

        this.setState({
          isSignedUp: true,
          message: response.data.message
        });

        return response.data;
      })
      .catch(err => {
        console.log(err + "\n" + err.response.data.error);

        const errorResponse =
          (err.response && err.response.data && err.response.data.error) || err.message || err.toString();

        this.setState({
          isSignedUp: false,
          message: errorResponse
        });
      })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.setState({
      isSignedUp: false,
      message: ""
    });

    // Check form validation functions
    this.form.validateAll();

    // Sign a user up if the form is validated with no error
    if (this.checkBtn.context._errors.length === 0) {

      const user = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }

      this.addUser(user)
        .then(response => {
          if (response) {
            console.log(response);
          }
        })
    } else {
      return this.props.history.push(`/signup`);
    }
  }

  // componentDidMount() {
  // }

  render() {
    return (
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 mt-5">
            <div className="card">
              <div className="card-header d-flex justify-content-between" style={{ backgroundColor: 'white' }}>
                <Link to="/"><img src={logo} height="30px" alt="logo-icon" /></Link>
                <Link to="/signin" className="nav-link h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign In</Link>
              </div>
              <div className="card-body">
                <Form noValidate onSubmit={this.onSubmit} ref={c => { this.form = c; }}>

                  {!this.state.isSignedUp && (
                    <div>
                      <h1 className="h3 mb-3">Sign Up for Pomo-Do</h1>
                      <div className="form-group">
                        <Input type="text" name="username" className="form-control mb-2" placeholder="Username" value={this.state.username} onChange={this.onChange} validations={[required]} />
                      </div>
                      <div className="form-group">
                        <Input type="email" name="email" className="form-control mb-2" placeholder="Email" value={this.state.email} onChange={this.onChange} validations={[required, email]} />
                      </div>
                      <div className="form-group">
                        <Input type="password" name="password" className="form-control mb-2" placeholder="Password" value={this.state.password} onChange={this.onChange} validations={[required]} />
                      </div>
                      <button type="submit" className="btn btn-danger-pomodo btn-block mb-2">
                        Sign Up
                  </button>
                    </div>
                  )}

                  {this.state.message && (
                    <div className={this.state.isSignedUp ? "alert alert-success-pomodo" : "alert alert-danger"} role="alert">
                      {this.state.message}
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }} />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;