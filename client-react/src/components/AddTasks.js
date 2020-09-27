import React ,{Component} from "react";

class AddTasks extends Component {
    state={
        title:"",
        body:""
    };
    onTitleChange(e){
        this.setState({
            [e.target.title]: e.target.value
        });
    }
    onBodyChange(e){
        this.setState({
            [e.target.body]:e.target.value
        });
    }
    onAddSubmit(e){
        const {addTask}=this.props;
        const newTask={
            id:Math.random(),
            title:this.state.name,
            body:this.state.body
        };
        addTask(newTask);
        console.log("form submit");
        e.preventDefault();
    }
    render(){
        const {title,body}=this.state;
        return(
            <div className="card">
                <h4 className="card-header">Add A New Task</h4>
                <div className="card-body">
                    <form onSubmit={this.onAddSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="title">Task Title</label>
                            <input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="add a task title"
                            className="form-control"
                            value={title}
                            onChange={this.onTitleChange.bind(this)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Task Body</label>
                            <input
                            type="text"
                            name="body"
                            id="body"
                            placeholder="add task description"

                            className="form-control"
                            value={body}
                            onChange={this.onBodyChange.bind(this)}></input>
                        </div>
                        <button type="submit" className="btn btn-danger btn-block">Add A New Task</button>
                    </form>
                </div>
            </div>
        );
    }
}
export default AddTasks;