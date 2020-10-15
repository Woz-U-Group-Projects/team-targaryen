import React from "react";
import "../css/style.css";

const NumberOfWorkCycles = (props) => {

  const decreaseNumberOfWorkCycles = (e) => {
    e.preventDefault();

    if (props.numberOfWorkCycles === 1) {
      return;
    }
    props.decreaseNumberOfWorkCycles();
  }

  const increaseNumberOfWorkCycles = (e) => {
    e.preventDefault();

    if (props.numberOfWorkCycles === 10) {
      return;
    }
    props.increaseNumberOfWorkCycles();
  }

  return (
    <div className="d-flex justify-content-between">
      <div>
        <h5>Work Cycles Before Long Break</h5>
      </div>
      <div>
        <button className="btn btn-danger-pomodo btn-sm" onClick={decreaseNumberOfWorkCycles}>Less</button>
        <p className="d-inline ml-1 mr-1">{props.numberOfWorkCycles}</p>
        <button className="btn btn-danger-pomodo btn-sm" onClick={increaseNumberOfWorkCycles}>More</button>
      </div>
    </div>
  );
}

export default NumberOfWorkCycles;