import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
// import "./App.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
// import Timer from "./components/Timer";
import Tasks from "./components/Tasks";
// import Task from "./components/Task";
// import Settings from "./components/Settings";
import Unauthorized from "./components/Unauthorized";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
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
    </BrowserRouter>
  );
}

export default App;
