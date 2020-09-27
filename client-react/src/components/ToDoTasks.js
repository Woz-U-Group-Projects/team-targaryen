import React ,{Component} from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import Task from "./Task";
class Tasks extends Component {
    render(){
        const {tasks,deleteTasks} =this.props;
        return(
<table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Task Title</th>
      <th scope="col">Task Body</th>
      <th scope="col">Delete</th>
      
    </tr>
  </thead>
  <tbody>{ 
      tasks.map(
          task=>{
              const{id,title,body}=task;
              return <Task key={id} id={id} title={title} body={body} deleteTasks={deleteTasks}/>;
          }
      )
  }
    
    
  </tbody>
</table>
        );
    }
}
export default Tasks;