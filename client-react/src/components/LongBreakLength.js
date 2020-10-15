import React from "react";
import "../css/style.css";

const LongBreakLength = (props) => {

  const decreaseLongBreakLength = (e) => {
    e.preventDefault();

    if (props.longBreakLength === 1) {
      return;
    }
    props.decreaseLongBreakLength();
  }

  const increaseLongBreakLength = (e) => {
    e.preventDefault();

    if (props.longBreakLength === 30) {
      return;
    }
    props.increaseLongBreakLength();
  }

  return (
    <div className="d-flex justify-content-between">
      <div>
        <h5>Long Break Length</h5>
      </div>
      <div>
        <button className="btn btn-danger-pomodo btn-sm" onClick={decreaseLongBreakLength}>Shorter</button>
        <p className="d-inline ml-1 mr-1">{props.longBreakLength}</p>
        <button className="btn btn-danger-pomodo btn-sm" onClick={increaseLongBreakLength}>Longer</button>
      </div>
    </div>
  );
}

export default LongBreakLength;