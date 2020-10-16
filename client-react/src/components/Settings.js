import React from "react";
import "../css/style.css";

import WorkCycleLength from "./WorkCycleLength";
import ShortBreakLength from "./ShortBreakLength";
import LongBreakLength from "./LongBreakLength";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workCycleLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,

      numberOfWorkCycles: 4,
      longBreakIndex: 7
    }
  }

  // Change Number of Work Cycles:
  onDecreaseNumberOfWorkCycles = () => {
    this.setState({
      numberOfWorkCycles: this.state.numberOfWorkCycles - 1,
      longBreakIndex: ((this.state.numberOfWorkCycles - 1) * 2) - 1
    });
  }

  onIncreaseNumberOfWorkCycles = () => {
    this.setState({
      numberOfWorkCycles: this.state.numberOfWorkCycles + 1,
      longBreakIndex: ((this.state.numberOfWorkCycles + 1) * 2) - 1
    });
  }

  // Change Sessions Length:
  onDecreaseWorkCycleLength = () => {
    this.setState({
      workCycleLength: this.state.workCycleLength - 1,
      currentTimerMinute: this.state.workCycleLength - 1
    });
  }

  onIncreaseWorkCycleLength = () => {
    this.setState({
      workCycleLength: this.state.workCycleLength + 1,
      currentTimerMinute: this.state.workCycleLength + 1
    });
  }

  onDecreaseShortBreakLength = () => {
    this.setState({
      shortBreakLength: this.state.shortBreakLength - 1
    });
  }

  onIncreaseShortBreakLength = () => {
    this.setState({
      shortBreakLength: this.state.shortBreakLength + 1
    });
  }

  onDecreaseLongBreakLength = () => {
    this.setState({
      longBreakLength: this.state.longBreakLength - 1
    });
  }

  onIncreaseLongBreakLength = () => {
    this.setState({
      longBreakLength: this.state.longBreakLength + 1
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row" id="settings">
          <div className="col mt-5 mb-5">
            <div className="card border-0">
              <div className="card-header text-center border-top border-right border-left" style={{ backgroundColor: "white" }}>
                <h3>Settings</h3>
              </div>
              <div className="card-body border-bottom">
                <div>
                  <WorkCycleLength
                    workCycleLength={this.state.workCycleLength}
                    decreaseWorkCycleLength={this.onDecreaseWorkCycleLength}
                    increaseWorkCycleLength={this.onIncreaseWorkCycleLength}
                  />
                  <hr />
                  <ShortBreakLength
                    shortBreakLength={this.state.shortBreakLength}
                    decreaseShortBreakLength={this.onDecreaseShortBreakLength}
                    increaseShortBreakLength={this.onIncreaseShortBreakLength}
                  />
                  <hr />
                  <LongBreakLength
                    longBreakLength={this.state.longBreakLength}
                    decreaseLongBreakLength={this.onDecreaseLongBreakLength}
                    increaseLongBreakLength={this.onIncreaseLongBreakLength}
                  />
                  <hr />
                  <NumberOfWorkCycles
                    numberOfWorkCycles={this.state.numberOfWorkCycles}
                    decreaseNumberOfWorkCycles={this.onDecreaseNumberOfWorkCycles}
                    increaseNumberOfWorkCycles={this.onIncreaseNumberOfWorkCycles}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;