import React, { Component } from 'react';
import { connect } from 'react-redux';
import {initTimer} from "../helpers/initTimer";

class Timer extends Component {

  constructor(props){
    super(props);
    this.state = {

      spentTime: 0,
      toggleButton: true,
      taskName: '',

      timeStart: {
        dateMs: 0,
      },
    };
  }

  addTask = (start = null, past = null) => {
    const id = Math.random()*start;
    const startTime = new Date(start);
    const endTime = new Date(start+past);
    let seconds = Math.round(past/1000);

    if(seconds < 10){
      seconds = `0${seconds}`;
    }

    const spentTime = `00:00:${seconds}`;

    if(this.state.taskName !== ''){
      this.props.onAddTask(
        {
          id: id,
          name: this.state.taskName,
          startTime: startTime,
          endTime: endTime,
          spentTime: spentTime
        });

      this.state.taskName = '';

    } else {
      alert("Enter task name");
    }
  };

  startTimer = () => {
    this.setState({toggleButton: false});
    this.nowDate = Date.now();

    const dateMs = Date.now();
    this.setState({timeStart: {dateMs: dateMs}});

    this.timer = setInterval(
      () => this.differenceTime(),
      1000
    );
  };

  stopTimer = () => {
    this.setState({toggleButton: true});
    const startDate = this.state.timeStart;
    this.addTask(startDate.dateMs, this.state.spentTime);
    clearInterval(this.timer);
  };

  differenceTime = () => {
    this.setState({spentTime: new Date() - this.nowDate});
  };

  onChangeTask = (e) => {
    this.setState({taskName: e});
  };

  render() {
    const { spentTime, toggleButton } = this.state;
    const timerInit = initTimer(spentTime);

    return (
      <div className='wrap_timer'>
        <input className="wrap_timer_input_task" placeholder="Enter task name" type="text" value={this.state.taskName} onChange={e => this.onChangeTask(e.target.value)}/>
        <div className='wrap_timer'>
          <input className="wrap_timer_input" value={`${timerInit.hours}:${timerInit.minutes}:${timerInit.seconds}`} readOnly/>
          <div className='wrap_timer_buttons'>
            <button className='wrap_timer_button' onClick={toggleButton ? this.startTimer : this.stopTimer}>{ toggleButton ? 'Start' : 'Stop'}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tasksStore: state.tasks
  }),

  dispatch => ({
    onAddTask: (task) => {
      dispatch({type: "ADD_TASK", payload: task});
    }
  })

)(Timer);


