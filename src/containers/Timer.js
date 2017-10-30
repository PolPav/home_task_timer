import React, { Component } from 'react';
import {initTimer} from "../helpers/index";

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {

          pastTime: 0,
          startTimer: 1,
          buttonText: 'Start',
          workedTime: ''
    };
  }

  toggleTimer = () => {
    this.nowDate = Date.now();
    const res = initTimer(this.state.pastTime);

      if(res.hours === '00' && res.minutes === '00' && res.seconds ==='00'){
          this.setState({workedTime: ''});

      } else {
          this.setState({workedTime: `${res.hours}:${res.minutes}:${res.seconds}`});
      }

      if(this.state.startTimer === 1){
          this.timer = setInterval(
            () => this.differenceTime(),
            1000
          );

          this.setState({buttonText: 'Stop'});
          this.state.startTimer = 0;

      }

      else if(this.state.startTimer === 0) {
              clearInterval(this.timer);

              this.setState({buttonText: 'Start'});
              this.state.startTimer = 1;
      }
  };

  differenceTime = () => {
    this.setState({pastTime: new Date() - this.nowDate});
  };

  render() {
    const timerInit = initTimer(this.state.pastTime);

    return (
      <div className='wrap_timer'>
        <div className='wrap_timer_stopped'>
          <h3>{`${timerInit.hours}:${timerInit.minutes}:${timerInit.seconds}`}</h3>
        </div>
        <div className='wrap_timer_buttons'>
          <button id='toggleButton' className='wrap_timer_button' onClick={this.toggleTimer}>{this.state.buttonText}</button>
        </div>
        <div>
          <h3>{this.state.workedTime}</h3>
        </div>
      </div>
    );
  }
}

export default Timer;


