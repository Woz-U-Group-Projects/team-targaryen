import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
// import Timer from "./components/Timer";
import Task from "./components/Task";
// import Settings from "./components/Settings";

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
        {/* <Route path="/timer" component={Timer}/> */}
        <Route path="/tasks" component={Task} />
        {/* <Route path="/settings" component={Settings} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
