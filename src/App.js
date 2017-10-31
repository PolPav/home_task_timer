import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initTimer } from './helpers/initTimer';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {

          pastTime: 0,
          toggleButton: true,

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

      const pastTime = `00:00:${seconds}`;

        if(this.taskNameInput.value !== ''){
            this.props.onAddTask({id: id, name: this.taskNameInput.value, startTime: startTime, endTime: endTime, spentTime: pastTime});
            this.taskNameInput.value = '';
        }
    };

    startTimer = (e) => {
      if(this.state.toggleButton === true) {

        this.setState({toggleButton: false});
        e.target.style.display = 'none';
        const stop = document.querySelector("#stopTimer");
              stop.style.display = 'inline';

        this.nowDate = Date.now();

        const dateMs = Date.now();
        this.setState({timeStart: {dateMs: dateMs}});

        this.timer = setInterval(
          () => this.differenceTime(),
          1000
        );
      }
    };

    stopTimer = (e) => {
      if(this.state.toggleButton === false) {
        this.setState({toggleButton: true});
        e.target.style.display = 'none';

        const start = document.querySelector("#startTimer");
              start.style.display = 'inline';

        const startDate = this.state.timeStart;
        this.addTask(startDate.dateMs, this.state.pastTime);
        clearInterval(this.timer);
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
                  <button id='stopTimer' className='wrap_timer_button' onClick={e => this.stopTimer(e)}>Stop</button>
                  <button id='startTimer' className='wrap_timer_button' onClick={e => this.startTimer(e)}>Start</button>
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
                            <td className="wrap_timer_table_tr_td">{task.startTime.toString()}</td>
                            <td className="wrap_timer_table_tr_td">{task.endTime.toString()}</td>
                            <td className="wrap_timer_table_tr_td">{task.spentTime}</td>
                            <td className="wrap_timer_table_tr_td"><button className="wrap_timer_table_button">Info</button></td>
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
