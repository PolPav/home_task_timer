import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './containers/Timer';
import { bindActionCreators } from 'redux';
import { getInfoTask } from './actions/getInfoTask';
import { deleteTask } from './actions/deleteTask';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';

class App extends Component {

  constructor(props) {
    super(props);
    // const store = [];
    // const str = JSON.stringify(store);
    // localStorage.setItem('allTasks', str);
  }

    render() {

      let data = [{hours: 0, minutes: 0, count: 0},
                  {hours: 1, minutes: 10, count: 0},
                  {hours: 2, minutes: 20, count: 0},
                  {hours: 3, minutes: 30, count: 0},
                  {hours: 4, minutes: 40, count: 0},
                  {hours: 5, minutes: 50, count: 0},
                  {hours: 6, minutes: 60, count: 0},
                  {hours: 7, count: 0},
                  {hours: 8, count: 0},
                  {hours: 9, count: 0},
                  {hours: 10, count: 0},
                  {hours: 11, count: 0},
                  {hours: 12, count: 0},
                  {hours: 13, count: 0},
                  {hours: 14, count: 0},
                  {hours: 15, count: 0},
                  {hours: 16, count: 0},
                  {hours: 17, count: 0},
                  {hours: 18, count: 0},
                  {hours: 19, count: 0},
                  {hours: 20, count: 0},
                  {hours: 21, count: 0},
                  {hours: 22, count: 0},
                  {hours: 23, count: 0}

      ];

    this.props.tasksStore.map((task) => {
      let startTime = new Date(task.startTime);
      let endTime = new Date(task.endTime);
      let startHours = startTime.getHours();
      let startMinutes = startTime.getMinutes();
      let startSeconds = startTime.getSeconds();
      let endSeconds = endTime.getSeconds();
      let endHours = endTime.getHours();
      let endMinutes = endTime.getMinutes();

      for(let i = 0; i < 24; i++){
        if(data[i].hours === startHours){
          data[i].count = ((endHours - startHours) + (endMinutes - startMinutes) + (endSeconds - startSeconds));
        }
      }
      console.log(`startHours:${startHours} endHours:${endHours}startMin:${startMinutes} endMin:${endMinutes} startSec:${startSeconds} endSec:${endSeconds}`);
    });

    if(!this.props.tasksStore){
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
              </Table>
            </Paper>
          </div>
        </MuiThemeProvider>
      );
    }

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
                <TableCell className="wrap_timer_table_tr_td">{new Date(task.startTime).toString()}</TableCell>
                <TableCell className="wrap_timer_table_tr_td">{new Date(task.endTime).toString()}</TableCell>
                <TableCell className="wrap_timer_table_tr_td">{task.spentTime}</TableCell>
                <TableCell className="wrap_timer_table_tr_td"><Button raised className="wrap_timer_table_button" onClick={() => this.props.getInfoTask(task)}><Link to="/info">Info</Link></Button></TableCell>
                <TableCell className="wrap_timer_table_tr_td"><Button raised className="wrap_timer_table_button" onClick={() => this.props.deleteTask(task)}>Delete</Button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </Paper>
        <BarChart width={1030} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hours" />
          <YAxis dataKey="minutes" />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
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
  return bindActionCreators({getInfoTask: getInfoTask, deleteTask: deleteTask}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
