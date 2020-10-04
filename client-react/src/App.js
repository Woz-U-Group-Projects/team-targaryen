import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
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

  state = { isSignedIn: false }

  signOut = () => {
    this.setState({ isSignedIn: false });
  }

  componentDidMount() {
    return axios.get("/users/issignedin")
      .then(response => {
        this.setState({ isSignedIn: response.status === 200 ? true : false });
      })
      .catch(response => {
        this.setState({ isSignedIn: false });
      })
  }
  render() {

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar isSignedIn={this.state.isSignedIn} signOut={this.signOut} />
          {/* <Task /> */}
          {/* <SignUp /> */}
          {/* <SignIn /> */}
          <Route exact path="/" component={Tasks} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          {/* <Route path="/timer" component={Timer}/> */}
          <Route path="/tasks" component={Tasks} />
          {/* <Route path="/settings" component={Settings} /> */}
          <Route path="/unauthorized" component={Unauthorized} />
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
