import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './containers/Timer';

class App extends Component {

  constructor(props) {
    super(props);
  }

    render() {

    return (
      <div className='wrap_timer'>
      <Timer/>
        <table className="wrap_timer_table">
          <thead>
            <tr className="wrap_timer_table_tr">
              <th className="wrap_timer_table_tr_td">task name</th>
              <th className="wrap_timer_table_tr_td">start time</th>
              <th className="wrap_timer_table_tr_td">end time</th>
              <th className="wrap_timer_table_tr_td">spent time</th>
              <th className="wrap_timer_table_tr_td">info</th>
              <th className="wrap_timer_table_tr_td">delete</th>
            </tr>
          </thead>
          <tbody>
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
)(App);
