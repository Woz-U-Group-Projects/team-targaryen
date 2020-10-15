import React from "react";
import "../css/style.css";

import PomoDoTimer from "./PomoDoTimer";
import WorkCycleLength from "./WorkCycleLength";
import ShortBreakLength from "./ShortBreakLength";
import LongBreakLength from "./LongBreakLength";
import NumberOfWorkCycles from "./NumberOfWorkCycles";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimerMinute: 25,

      workCycleLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,

      numberOfWorkCycles: 4,
      longBreakIndex: 7
    }
  }

  onUpdateTimerMinute = () => {
    this.setState({ currentTimerMinute: this.state.currentTimerMinute - 1 });
  }

  onSwitchSession = (currentSessionIndex) => {
    if (currentSessionIndex % 2 === 0) {
      this.setState({ currentTimerMinute: this.state.workCycleLength });
    }
    else if (currentSessionIndex % 2 !== 0) {
      if (currentSessionIndex === this.state.longBreakIndex) {
        this.setState({ currentTimerMinute: this.state.longBreakLength });
      }
      else {
        this.setState({ currentTimerMinute: this.state.shortBreakLength });
      }
    }
  }

  onCancelTimer = () => {
    this.setState({ currentTimerMinute: this.state.workCycleLength });
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
    })
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
      <div className="container-fluid" >

        {!this.props.isSettingsTabActive ? (
          < div className="row" >
            <div className="col mt-5">
              <div className="card text-center border-0">
                <div className="card-header border-top border-right border-left" style={{ backgroundColor: "white" }}>
                  <h3>Timer</h3>
                </div>
                <div className="card-body">
                  <div>
                    <PomoDoTimer
                      currentTimerMinute={this.state.currentTimerMinute}
                      updateTimerMinute={this.onUpdateTimerMinute}
                      switchSession={this.onSwitchSession}
                      longBreakIndex={this.state.longBreakIndex}
                      cancelTimer={this.onCancelTimer}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
            < div className="row" id="settings" >
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
            </div >
          )}
      </div >
    );
  }
}

export default Timer;