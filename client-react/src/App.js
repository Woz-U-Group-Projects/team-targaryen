import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Task from "./components/Task";
// import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Task /> */}
        {/* <SignUp /> */}
        <Route exact path="/" component={Task} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
      </div>
    </Router>
  );
}

export default App;
