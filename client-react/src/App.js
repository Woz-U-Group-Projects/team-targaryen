import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Task from "./components/Task";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        {/* <Task /> */}
        {/* <SignUp /> */}
        {/* <SignIn /> */}
        <Route exact path="/" component={Task} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/tasks" component={Task} />
      </div>
    </BrowserRouter>
  );
}

export default App;
