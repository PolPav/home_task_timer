import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './containers/Timer';
import { bindActionCreators } from 'redux';
import { getInfoTask } from './actions/getInfoTask';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

class App extends Component {

  constructor(props) {
    super(props);
  }

    render() {
    console.log(this.props.tasksStore);

    return (
      <MuiThemeProvider>
      <div className='wrap_timer'>
      <Timer/>
        <Paper>
        <Table className="wrap_timer_table">
          <TableHead>
            <TableRow className="wrap_timer_table_tr">
              <TableCell className="wrap_timer_table_tr_td">task name</TableCell>
              <TableCell className="wrap_timer_table_tr_td">start time</TableCell>
              <TableCell className="wrap_timer_table_tr_td">end time</TableCell>
              <TableCell className="wrap_timer_table_tr_td">spent time</TableCell>
              <TableCell className="wrap_timer_table_tr_td">info</TableCell>
              <TableCell className="wrap_timer_table_tr_td">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.tasksStore.map((task, idx) =>
              <TableRow key={idx} className="wrap_timer_table_tr">
                <TableCell className="wrap_timer_table_tr_td">{task.name}</TableCell>
                <TableCell className="wrap_timer_table_tr_td">{task.startTime.toString()}</TableCell>
                <TableCell className="wrap_timer_table_tr_td">{task.endTime.toString()}</TableCell>
                <TableCell className="wrap_timer_table_tr_td">{task.spentTime}</TableCell>
                <TableCell className="wrap_timer_table_tr_td"><Button raised className="wrap_timer_table_button" onClick={() => this.props.getInfoTask(task)}><Link to="/info">Info</Link></Button></TableCell>
                <TableCell className="wrap_timer_table_tr_td"><Button raised className="wrap_timer_table_button">Delete</Button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </Paper>
      </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasksStore: state.tasks,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getInfoTask: getInfoTask}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
