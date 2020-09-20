import React from "react";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import axios from "axios";
import '../bootstrap.min.css';
import logo from "../images/Pomo-Do_logo-icon-50x50.png";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

    }

    signIn = (user) => {
        axios.post('/users/signin', {
            email: user.email,
            password: user.password
        })
            .then(response => {
                localStorage.setItem('usertoken', response.data)
                return response.data
                // console.log('Signed in')
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
            email: this.state.email,
            password: this.state.password
        }
        this.signIn(user).then(response => {
            return (
            // if (response) {
                // this.props.history.push(`/`)
                <Redirect to="/" />
            // }
            )
        })
    }

    // componentDidMount() {
    // }

    // return axios.get("http://localhost:3001/users/signin");

    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 mt-5">
                            {/* <div className="d-flex justify-content-between">
                <a href="#"><img src={logo} height="30px" alt="logo-icon" /></a>
                <a href="#" className="nav-item h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign In</a>
            </div> */}
                            <div className="card">
                                <div className="card-header d-flex justify-content-between" style={{ backgroundColor: 'white' }}>
                                    <Link to="/"><img src={logo} height="30px" alt="logo-icon" /></Link>
                                    <Link to="/signup" className="nav-link h6" style={{ color: "#FF3939", textDecoration: "none" }}>Sign Up</Link>
                                </div>
                                <div className="card-body">
                                    <form noValidate onSubmit={this.onSubmit}>
                                        <h1 className="h3 mb-3">Sign In to Pomo-Do</h1>
                                        <div className="form-group">
                                            <input type="email" name="email" className="form-control"
                                                placeholder="Email" value={this.state.email} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name="password" className="form-control"
                                                placeholder="Password" value={this.state.password} onChange={this.onChange} />
                                        </div>
                                        <button type="submit" className="btn btn-danger btn-block">
                                            Sign In
                                    </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default SignIn;