import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initTimer } from './helpers/initTimer';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {

          pastTime: 0,
          startTimer: 1,
          buttonText: 'Start',
          workedTime: '',
          timeStart: '',
          timeEnd: ''
      };
  }

    addTask = () => {
        if(this.taskNameInput.value !== ''){
            this.props.onAddTask({name: this.taskNameInput.value, spentTime: this.timerInput.value});
            this.taskNameInput.value = '';
        }
    };

    toggleTimer = () => {
        console.log(`start: ${this.state.timeStart}`);
        this.nowDate = Date.now();
        const res = initTimer(this.state.pastTime);

        if(res.hours === '00' && res.minutes === '00' && res.seconds ==='00'){
            this.setState({workedTime: ''});

        } else {
            this.setState({workedTime: `${res.hours}:${res.minutes}:${res.seconds}`});
        }

        if(this.state.startTimer === 1){
            const dateStart = new Date();
            let hours = dateStart.getHours();
            let minutes = dateStart.getMinutes();
            let seconds = dateStart.getSeconds();

            if(seconds < 10){
                seconds = `0${seconds}`;
            }
            if(minutes < 10){
                minutes = `0${minutes}`;
            }
            if(hours < 10){
                hours = `0${hours}`;
            }

            this.setState({timeStart: `${hours}:${minutes}:${seconds}`});
            this.timer = setInterval(
                () => this.differenceTime(),
                1000
            );

            this.setState({buttonText: 'Stop'});
            this.state.startTimer = 0;

        }

        else if(this.state.startTimer === 0) {
            this.addTask();
            clearInterval(this.timer);

            this.setState({buttonText: 'Start'});
            this.state.startTimer = 1;
        }
    };

    differenceTime = () => {

        this.setState({pastTime: new Date() - this.nowDate});
    };

    render() {
    console.log(this.props.tasksStore);
    const timerInit = initTimer(this.state.pastTime);
    return (
      <div className='wrap_timer'>
          <input className="wrap_timer_input_task" type="text" ref={(input) => {this.taskNameInput = input}}/>
          <div className='wrap_timer'>
              <input className="wrap_timer_stopped" value={`${timerInit.hours}:${timerInit.minutes}:${timerInit.seconds}`} readOnly ref={(input) => {this.timerInput = input}}/>
              <div className='wrap_timer_buttons'>
                  <button id='toggleButton' className='wrap_timer_button' onClick={this.toggleTimer}>{this.state.buttonText}</button>
              </div>
          </div>
          <table className="wrap_timer_table">
              <tbody>
                    <tr className="wrap_timer_table_tr">
                        <th className="wrap_timer_table_tr_td">task name</th>
                        <th className="wrap_timer_table_tr_td">start time</th>
                        <th className="wrap_timer_table_tr_td">end time</th>
                        <th className="wrap_timer_table_tr_td">spent time</th>
                        <th className="wrap_timer_table_tr_td">info</th>
                        <th className="wrap_timer_table_tr_td">delete</th>
                    </tr>
                    {this.props.tasksStore.map((task, idx) =>
                        <tr key={idx} className="wrap_timer_table_tr">
                            <td className="wrap_timer_table_tr_td">{task.name}</td>
                            <td className="wrap_timer_table_tr_td">{this.state.timeStart}</td>
                            <td className="wrap_timer_table_tr_td">{task.endTime}</td>
                            <td className="wrap_timer_table_tr_td">{task.spentTime}</td>
                            <td className="wrap_timer_table_tr_td"><button className="wrap_timer_table_button" onClick={this.InfoTask}>Info</button></td>
                            <td className="wrap_timer_table_tr_td"><button className="wrap_timer_table_button">Delete</button></td>
                        </tr>
                    )}
              </tbody>
          </table>
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
)(App);
