import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Timer from "./components/Timer";
import Tasks from "./components/Tasks";
import Unauthorized from "./components/Unauthorized";

class App extends React.Component {

  state = { isSignedIn: false, isLoading: true, isSettingsTabActive: false }

  signOut = () => {
    this.setState({ isSignedIn: false, isLoading: false });
  }

  onIsSettingsTabActive = () => {
    this.setState({ isSettingsTabActive: true });
  }

  onIsTimerTabActive = () => {
    this.setState({ isSettingsTabActive: false });
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
          <span className="spinner-border spinner-border-sm text-danger-pomodo" role="status"></span>
        </div>
      )
    }

    return (
      <BrowserRouter>
        <div className="App">

          <Navbar isSignedIn={this.state.isSignedIn} signOut={this.signOut} isTimerTabActive={this.onIsTimerTabActive} isSettingsTabActive={this.onIsSettingsTabActive} />

          <Route exact path="/">
            {this.state.isSignedIn ? <Redirect to="/tasks" /> : <Redirect to="/signin" />}
          </Route>

          <Route path="/signup" component={SignUp} />

          <Route path="/signin" component={SignIn} />

          <Route path="/timer">
            <Timer isSettingsTabActive={this.state.isSettingsTabActive} />
          </Route>

          <Route path="/tasks" component={this.state.isSignedIn ? Tasks : Unauthorized} />

          <Route path="/unauthorized" component={Unauthorized} />
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
