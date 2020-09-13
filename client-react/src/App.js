import React from "react";
import  Task from "./components/Task";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Task />
    </div>
  );
}

export default App;
