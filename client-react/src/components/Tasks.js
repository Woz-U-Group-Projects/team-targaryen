import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/bootstrap.min.css";
import "../css/style.css";
import Unauthorized from "./Unauthorized";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: [],
      taskTitle: "",
      taskBody: "",
      isLoading: false,
      isFormVisible: false,
      isCheckedOut: false
    }
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    return axios.get("/tasks")
      .then(response => {
        this.setState({ taskData: response.data })
      })
      .catch(err => {
        console.log(err + "\n" + err.response.data.error);
        localStorage.removeItem("usertoken");
        // return this.props.history.push(`/unauthorized`);

        this.setState({
          isLoading: false
        });
      });
  };

  addTask = (newTask) => {
    return axios.post("/tasks", {
      taskTitle: newTask.taskTitle,
      taskBody: newTask.taskBody
    })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.log(err + "\n" + err.response.data.error);
      });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitAddTask = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const task = {
      taskTitle: this.state.taskTitle,
      taskBody: this.state.taskBody
    }

    this.addTask(task)
      .then(response => {
        if (response) {
          return window.location.reload();
        } else {
          return this.props.history.push(`/unauthorized`);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        return this.props.history.push(`/unauthorized`);
      })
  };

  onClickPlus = (e) => {
    const { isFormVisible } = this.state;
    this.setState({ isFormVisible: !isFormVisible });
  };

  onClickCheck = (e) => {
    const { isCheckedOut } = this.state;
    this.setState({ isCheckedOut: !isCheckedOut });
  }

  render() {
    console.log(this.state.taskData);

    const tasks = this.state.taskData.map((task, index) => (
      <div key={task.taskId}>
        <div className="d-flex justify-content-between">
          <div>
            <strong>{task.taskTitle}</strong>
            <br />
            {task.taskBody}
          </div>
          <div className="d-flex align-items-center">
            <span><i className="ml-4 fas fa-check" onClick={this.onClickCheck} style={{ color: this.state.isCheckedOut ? "#406340" : "lightgrey" }}></i></span>
            <span><i className="ml-4 fas fa-trash-alt"></i></span>
          </div>
        </div>
        <hr />
      </div>
    ));

    const addTaskForm =
      <form onSubmit={this.onSubmitAddTask}>
        <div className="form-group">
          <input type="text" name="taskTitle" className="form-control mb-2" placeholder="Task Title" value={this.state.taskTitle} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <input type="text" name="taskBody" className="form-control mb-2" placeholder="Task Body" value={this.state.taskBody} onChange={this.onChange} />
        </div>
        <button type="submit" className="btn btn-danger-pomodo-2 btn-block mb-2" disabled={this.state.isLoading}>
          {this.state.isLoading && (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          )}
          <span>Add Task</span>
        </button>
        <hr />
      </form>

    const tasksPage =
      <div className="container-fluid">
        <div className="row">
          <div className="col mt-5">
            <div className="card">
              <div className="card-header d-flex justify-content-center" style={{ backgroundColor: "white" }}>
                <h1 className="h3 col-11 float-left d-flex justify-content-center">My To-Do List</h1>
                <h4><i className="col-1 fas fa-plus" onClick={this.onClickPlus} style={{ cursor: "pointer" }}></i></h4>
              </div>
              <div className="card-body">
                {this.state.isFormVisible ? addTaskForm : null}
                {tasks}
              </div>
            </div>
          </div>
        </div>
      </div>

    return (
      <div>
        {localStorage.usertoken ? tasksPage : <Unauthorized />}
      </div>
    );
  }
}

export default Tasks;
