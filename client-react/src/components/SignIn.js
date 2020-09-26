import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    }
  }

  signIn = (user) => {
    return axios.post("/users/signin", {
      email: user.email,
      password: user.password
    })
      .then(response => {
        localStorage.setItem("usertoken", response.data);
        console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.log(err + "\n" + err.response.data.error);

        const errorResponse =
          (err.response && err.response.data && err.response.data.error) || err.message || err.toString();

        this.setState({
          loading: false,
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
      loading: true,
      message: ""
    });

    // Check form validation functions
    this.form.validateAll();

    // Sign a user in if the form is validated with no error
    if (this.checkBtn.context._errors.length === 0) {

      const user = {
        email: this.state.email,
        password: this.state.password
      }

      this.signIn(user)
        .then(response => {
          if (response) {
            return this.props.history.push(`/tasks`) || window.location.reload();
          }
        })
    } else {
      this.setState({ loading: false });
      return this.props.history.push(`/signin`)
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
                <Link to="/signup" className="nav-link h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign Up</Link>
              </div>
              <div className="card-body">
                <Form onSubmit={this.onSubmit} ref={c => { this.form = c; }}>
                  <h1 className="h3 mb-3">Sign In to Pomo-Do</h1>
                  <div className="form-group">
                    <Input type="email" name="email" className="form-control mb-2" placeholder="Email" value={this.state.email} onChange={this.onChange} validations={[required]} />
                  </div>
                  <div className="form-group">
                    <Input type="password" name="password" className="form-control mb-2" placeholder="Password" value={this.state.password} onChange={this.onChange} validations={[required]} />
                  </div>
                  <button type="submit" className="btn btn-danger-pomodo btn-block mb-2" disabled={this.state.loading}>
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                    )}
                    <span>Sign In</span>
                  </button>

                  {this.state.message && (
                    <div className="text-danger-pomodo" role="alert">
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

export default SignIn;