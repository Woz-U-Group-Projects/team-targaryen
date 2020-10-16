import React from "react";
import "../css/style.css";

const WorkCycleLength = (props) => {

  const decreaseWorkCycleLength = (e) => {
    e.preventDefault();

    if (props.workCycleLength === 1) {
      return;
    }
    props.decreaseWorkCycleLength();
  }

  const increaseWorkCycleLength = (e) => {
    e.preventDefault();

    if (props.workCycleLength === 60) {
      return;
    }
    props.increaseWorkCycleLength();
  }

  return (
    <div className="d-flex justify-content-between">
      <div>
        <h5>Work Cycle Length</h5>
      </div>
      <div>
        <button className="btn btn-danger-pomodo btn-sm" onClick={decreaseWorkCycleLength}>Shorter</button>
        <p className="d-inline ml-1 mr-1">{props.workCycleLength}</p>
        <button className="btn btn-danger-pomodo btn-sm" onClick={increaseWorkCycleLength}>Longer</button>
      </div>
    </div>
  );
}

export default WorkCycleLength;