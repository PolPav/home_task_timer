import React, { Component } from 'react';
import { connect } from 'react-redux';
import {initTimer} from "../helpers/initTimer";
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';

class Timer extends Component {

  constructor(props){

    super(props);

    this.reloadTime = JSON.parse(localStorage.getItem('timer'));
    this.state = {

      spentTime: 0,
      toggleButton: false,
      taskName: '',

      timeStart: {
        dateMs: 0,
      },
    };
  }

  componentWillMount(){

    if(this.reloadTime !== null){
      this.nowDate = Date.now() - this.reloadTime;

      const dateMs = this.nowDate;
      this.setState({timeStart: {dateMs: dateMs}});
      this.setState({toggleButton: false});

      this.timer = setInterval(
        () => this.differenceTime(),
        1000
      );

    } else {
      this.setState({toggleButton: true});
    }
  };

  addTask = (start = null, past = null) => {

    const id = Math.random();
    const startTime = new Date(start);
    const endTime = new Date(start+past);

    const timerInit = initTimer(this.state.spentTime);
    const spentTime =  `${timerInit.hours}:${timerInit.minutes}:${timerInit.seconds}`;

    if(this.state.taskName !== ''){
      this.props.onAddTask(
        {
          id: id,
          name: this.state.taskName,
          startTime: startTime,
          endTime: endTime,
          spentTime: spentTime
        });

      this.setState({taskName: ''});

    } else {
      alert("Enter task name");
      this.setState({toggleButton: false});
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
    localStorage.setItem('timer', null);
    clearInterval(this.timer);

  };

  differenceTime = () => {

    this.setState({spentTime: new Date() - this.nowDate});
    const timer = this.state.spentTime;
    const str = JSON.stringify(timer);
    localStorage.setItem('timer', str);
<<<<<<< HEAD

=======
>>>>>>> 32919b984f508b4f3e88e254fe1b21ddf32a56ec
  };

  onChangeTask = (e) => {

    this.setState({taskName: e});
  };

  render() {

    const { spentTime, toggleButton } = this.state;
    const timerInit = initTimer(spentTime);

    return (
      <div className='wrap_timer'>
        <Input className="wrap_timer_input_task" placeholder="Enter task name" type="text" value={this.state.taskName} onChange={e => this.onChangeTask(e.target.value)}/>
        <div className='wrap_timer'>
          <div className="wrap_timer_input">
            <h3 className="wrap_timer_input_h3">{`${timerInit.hours}:${timerInit.minutes}:${timerInit.seconds}`}</h3>
          </div>
          <div className='wrap_timer_buttons'>
            <Button raised className='wrap_timer_button' onClick={toggleButton ? this.startTimer : this.stopTimer}>{ toggleButton ? 'Start' : 'Stop'}</Button>
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


