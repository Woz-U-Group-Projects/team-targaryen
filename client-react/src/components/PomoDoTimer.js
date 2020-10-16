import React from "react";
import "../css/style.css";

class PomoDoTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSessionIndex: 0,
      currentTimerSecond: 0,
      interval: null,

      isTimerPlaying: false
    }
  }

  onClickPlayTimer = () => {
    let interval = setInterval(this.decreaseTimer, 10);

    this.setState({ interval: interval, isTimerPlaying: true });
  }

  decreaseTimer = () => {
    switch (this.state.currentTimerSecond) {

      case 0:
        if (this.props.currentTimerMinute === 0) {
          if (this.state.currentSessionIndex < this.props.longBreakIndex) {
            this.setState({ currentSessionIndex: this.state.currentSessionIndex + 1 });
            this.props.switchSession(this.state.currentSessionIndex);
          }
        } else {
          this.props.updateTimerMinute();
          this.setState({ currentTimerSecond: 59 });
        }
        break;
      default:
        return this.setState({ currentTimerSecond: this.state.currentTimerSecond - 1 });

    }
  }

  onClickPauseTimer = () => {
    clearInterval(this.state.interval);

    this.setState({ isTimerPlaying: false });
  }

  onClickCancelTimer = () => {
    this.onClickPauseTimer();
    this.props.cancelTimer();
    this.setState({ currentTimerSecond: 0, currentSessionIndex: 0, isTimerPlaying: false });
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="mb-3 border rounded-circle border-shadow-pomodo d-flex flex-column justify-content-center" style={{ width: "250px", height: "250px" }}>
          <h5>{
            this.state.currentSessionIndex % 2 === 0
              ? "Work Cycle"
              : this.state.currentSessionIndex === this.props.longBreakIndex
                ? "Long Break"
                : this.state.currentSessionIndex % 2 !== 0
                  ? "Short Break"
                  : null
          }</h5>
          <div>
            {!this.state.isTimerPlaying
              ? (
                <span className="h1 btn-danger-pomodo-3" onClick={this.onClickPlayTimer} disabled={this.state.isTimerPlaying}><i className="fas fa-play"></i></span>
              )
              : (
                <span className="h1 btn-danger-pomodo-3" onClick={this.onClickPauseTimer}><i className="fas fa-pause"></i></span>
              )}
          </div>
          <h3>
            <span>{this.props.currentTimerMinute}</span>
            <span>:</span>
            <span>
              {this.state.currentTimerSecond < 10 ? "0" + this.state.currentTimerSecond : this.state.currentTimerSecond}
            </span>
          </h3>
        </div>
        <span className="h1 mb-3 btn-danger-pomodo-3" onClick={this.onClickCancelTimer}><i className="fas fa-undo-alt"></i></span>
      </div>
    )
  }
}

export default PomoDoTimer;