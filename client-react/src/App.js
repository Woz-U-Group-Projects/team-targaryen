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
/* import React, { Component } from 'react';
import AddTasks from "./components/AddTasks";
import Tasks from "./components/Tasks";

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      tasks:[
        {
          id:1,
          title:"clean up",
          body:"bathroo cleaning"          
        },
        {id:2,
          title:"washing",
          body:"bathroo cleaning"

        },{
        id:3,
          title:"dasting",
          body:"bathroo cleaning"}
      ]
    };
    this.deleteTask=this.deleteTask.bind(this);
    this.addTask=this.addTask.bind(this);
  }
addTask(newTask){
  let updatedTasks=this.state.users;
  updatedTasks.push(newTask);
  this.setState({
    tasks:updatedTasks
  });
}

  deleteTask(id){
    let updatedTasks= this.state.tasks;
    updatedTasks= updatedTasks.filter(task => task.id !== id);
    this.setState({
      tasks:updatedTasks
    })
  }


  render(){
   
    const isok =true;
    return(<div className="container">
    
      <h5> todo app</h5>
      <hr/>
      <AddTasks addTask={this.addTask}/>
      <hr/>
      <Tasks  deleteTask = {this.deleteTask} tasks={this.state.tasks}/>
      <hr/>
      
    </div>

    );
  }
}

export default App;
*/
