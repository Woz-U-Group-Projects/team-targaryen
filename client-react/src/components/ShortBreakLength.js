import React from "react";
import "../css/style.css";

const ShortBreakLength = (props) => {

  const decreaseShortBreakLength = (e) => {
    e.preventDefault();

    if (props.shortBreakLength === 1) {
      return;
    }
    props.decreaseShortBreakLength();
  }

  const increaseShortBreakLength = (e) => {
    e.preventDefault();

    if (props.shortBreakLength === 15) {
      return;
    }
    props.increaseShortBreakLength();
  }

  return (
    <div className="d-flex justify-content-between">
      <div>
        <h5>Short Break Length</h5>
      </div>
      <div>
        <button className="btn btn-danger-pomodo btn-sm" onClick={decreaseShortBreakLength}>Shorter</button>
        <p className="d-inline ml-1 mr-1">{props.shortBreakLength}</p>
        <button className="btn btn-danger-pomodo btn-sm" onClick={increaseShortBreakLength}>Longer</button>
      </div>
    </div>
  );
}

export default ShortBreakLength;