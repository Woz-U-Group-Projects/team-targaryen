import React from "react";
import axios from "axios";
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import "../css/bootstrap.min.css";
import "../css/style.css";
import Unauthorized from "./Unauthorized";
// import Task from "./Task";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: [],
      taskTitle: "",
      taskBody: "",

      isSignedIn: true,
      isLoading: false,

      isAddFormVisible: false,

      isDialogOpen: {},
      selectedTask: {},

      isDoneLoading: false
    }
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    return axios.get("/tasks")
      .then(response => {
        if (response.status === 200) { this.setState({ taskData: response.data }) }
        else { this.setState({ isSignedIn: false }) }
      })
      .catch(err => {
        console.log(err + ": \n" + err.response.data.error);

        this.setState({
          isSignedIn: false,
          isLoading: false
        });

        return this.props.history.push(`/unauthorized`);
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

  onChangeAdd = (e) => {
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
    const { isAddFormVisible } = this.state;
    this.setState({ isAddFormVisible: !isAddFormVisible });
  };

  // getTask = () => {
  //   let taskId = this.props.match.params.id;
  //   return axios.get("/tasks/" + taskId)
  //     .then(response => {
  //       this.setState({ selectedTaskData: response.data })
  //     })
  //     .catch(err => {
  //       console.log(err + ": \n" + err.response.data.error);
  //       // return this.props.history.push(`/unauthorized`);

  //       this.setState({
  //         isSignedIn: false,
  //         isLoading: false
  //       });
  //     });
  // };

  handleDialogClose = (e) => {
    this.setState({
      isDialogOpen: {},
      selectedTask: {}
    });
  }

  onClickDelete = (task) => () => {
    this.setState({
      isDialogOpen: { deleteDialog: true },
      selectedTask: { ...task, deleted: true }
    });
  }

  onClickDone = (task) => () => {
    this.setState({ isDoneLoading: true })

    this.editTask({ ...task, done: !task.done })
      .then(() => {
        this.setState({
          taskData: this.state.taskData.map(task2 => {
            if (task.taskId === task2.taskId) {
              return (
                { ...task, done: !task.done }
              )
            }
            return (
              task2
            )
          }),
          isDoneLoading: false
        })
      })
      .catch(() => {
        this.setState({ isDoneLoading: false });
        alert("Failed to update done status");
      })

    // this.setState({
    //   isDialogOpen: { doneDialog: true },
    //   selectedTask: { ...task, done: !task.done }
    // });
  }

  onClickEdit = (task) => (e) => {
    this.setState({
      isDialogOpen: { editDialog: true },
      selectedTask: task
    });
  }

  onChangeEdit = (e) => {
    this.setState({
      selectedTask: {
        ...this.state.selectedTask,
        [e.target.name]: e.target.value
      }
    });
  };

  editTask = (editedTask) => {
    let taskId = editedTask.taskId;
    return axios.put("/tasks/" + taskId, {
      taskTitle: editedTask.taskTitle,
      taskBody: editedTask.taskBody,
      taskId: editedTask.taskId,
      done: editedTask.done,
      deleted: editedTask.deleted
    })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(err => {
        console.log(err + "\n" + err.response.data.error);
      });
  };

  onSubmitEditTask = (e) => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const task = {
      taskTitle: this.state.selectedTask.taskTitle,
      taskBody: this.state.selectedTask.taskBody,
      taskId: this.state.selectedTask.taskId,
      deleted: this.state.selectedTask.deleted
    }
    this.editTask(task)
      .then(response => {
        if (response) {
          return window.location.reload();
        }
        else {
          return this.props.history.push(`/unauthorized`);
        }
      })
      .catch(err => {
        this.setState({ isLoading: false });
        return this.props.history.push(`/unauthorized`);
      })
  };

  render() {
    console.log(this.state.taskData);

    if (this.state.taskData.length === 0) {
      return (
        <div className="d-flex justify-content-center">
          <span className="spinner-border spinner-border-sm text-danger-pomodo" role="status"></span>
        </div>
      )
    }

    const tasks = this.state.taskData.map((task) => (
      <div key={task.taskId} >
        <div className="d-flex justify-content-between">

          <div style={{ flex: "1", width: "0" }}>
            <span><strong>{task.taskTitle}</strong></span>
            <br />
            <span>{task.taskBody}</span>
          </div>

          <div className="d-flex align-items-center">
            <span>
              <i className="ml-4 fas fa-pencil-alt" onClick={this.onClickEdit(task)} style={{ cursor: "pointer" }}></i>
            </span>
            <span>
              {(this.state.isDoneLoading) ? (
                <span id={task.taskId} className="ml-4 spinner-border spinner-border-sm text-danger-pomodo" role="status"></span>) : (
                  <i className="ml-4 fas fa-check" onClick={this.onClickDone(task)} style={{ cursor: "pointer", color: task.done ? "#406340" : "lightgrey" }} disabled={this.state.isDoneLoading}></i>)}
            </span>
            <span>
              <i className="ml-4 fas fa-trash-alt" onClick={this.onClickDelete(task)} style={{ cursor: "pointer" }}></i>
            </span>
          </div>

        </div>
        <hr />
      </div>
    ));

    const addTaskForm =
      <form onSubmit={this.onSubmitAddTask}>
        <div className="form-group">
          <input type="text" name="taskTitle" className="form-control mb-2" placeholder="Task Title" value={this.state.taskTitle} onChange={this.onChangeAdd} />
        </div>
        <div className="form-group">
          <input type="text" name="taskBody" className="form-control mb-2" placeholder="Task Body" value={this.state.taskBody} onChange={this.onChangeAdd} />
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
                {this.state.isAddFormVisible ? addTaskForm : null}
                {tasks}
              </div>
            </div>
          </div>
        </div>
      </div>

    return (
      <div>
        <Modal show={this.state.isDialogOpen.editDialog} onHide={this.handleDialogClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control as="textarea" name="taskTitle" className="mb-2" placeholder="Title" value={this.state.selectedTask.taskTitle} onChange={this.onChangeEdit} />
            <Form.Control as="textarea" name="taskBody" className="mb-2" placeholder="Body" value={this.state.selectedTask.taskBody} onChange={this.onChangeEdit} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDialogClose}>
              Close
            </Button>
            <Button className="btn-danger-pomodo" onClick={this.onSubmitEditTask} disabled={this.state.isLoading}>
              {this.state.isLoading && (
                <Spinner as="span" animation="border" size="sm" role="status" />
              )}
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.isDialogOpen.deleteDialog} onHide={this.handleDialogClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You'll lose all task info!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleDialogClose}>
              No, keep it
            </Button>
            <Button className="btn-danger-pomodo" onClick={this.onSubmitEditTask} disabled={this.state.isLoading}>
              {this.state.isLoading && (
                <Spinner as="span" animation="border" size="sm" role="status" />
              )}
              Yes, delete it
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.isSignedIn ? tasksPage : <Unauthorized />}
      </div>
    );
  }
}

export default Tasks;
