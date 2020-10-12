import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";
// import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
// import Timer from "./components/Timer";
import Tasks from "./components/Tasks";
// import Task from "./components/Task";
// import Settings from "./components/Settings";
import Unauthorized from "./components/Unauthorized";

class App extends React.Component {

  state = { isSignedIn: false, isLoading: true }

  signOut = () => {
    this.setState({ isSignedIn: false, isLoading: false });
  }

  componentDidMount() {
    return axios.get("/users/issignedin")
      .then(response => {
        this.setState({
          isSignedIn: response.status === 200 ? true : false,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ isSignedIn: false, isLoading: false });
      })
  }

  render() {
    console.log(this.state.isSignedIn)

    if (this.state.isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <span className="spinner-border spinner-border-sm" role="status"></span>
        </div>
      )
    }

    return (
      <BrowserRouter>
        <div className="App">
          {/* <Route path="/!(signup|signin|unauthorized)">
            {!this.state.isSignedIn && <Redirect to="/signin" />}
          </Route> */}
          <Navbar isSignedIn={this.state.isSignedIn} signOut={this.signOut} />
          <Route exact path="/">
            {/* <Redirect to="/tasks"></Redirect> */}
            {this.state.isSignedIn ? <Redirect to="/tasks" /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          {/* <Route path="/timer" component={Timer}/> */}
          {/* <Route path="/tasks" component={Tasks} /> */}
          <Route path="/tasks" component={Tasks} />
          {/* {this.state.isSignedIn ? <Tasks /> : <Redirect to="/unauthorized" />} */}
          {/* </Route> */}
          {/* <Route path="/tasks/:id" component={Task} /> */}
          {/* <Route path="/settings" component={Settings} /> */}
          <Route path="/unauthorized" component={Unauthorized} />
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
