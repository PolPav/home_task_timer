import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

class TaskInfo extends Component {

  render(){

    const { currentTask } = this.props;
    return (
     <div className="task_info">
       <Button raised className="wrap_timer_table_button"><Link to="/">Back</Link></Button>
       <Table className="wrap_timer_table">
         <TableHead>
         <TableRow className="wrap_timer_table_tr">
           <TableCell className="wrap_timer_table_tr_td">task name</TableCell>
           <TableCell className="wrap_timer_table_tr_td">start time</TableCell>
           <TableCell className="wrap_timer_table_tr_td">end time</TableCell>
           <TableCell className="wrap_timer_table_tr_td">spent time</TableCell>
         </TableRow>
         </TableHead>
         <TableBody>
           <TableRow className="wrap_timer_table_tr">
             <TableCell className="wrap_timer_table_tr_td">{currentTask.name}</TableCell>
             <TableCell className="wrap_timer_table_tr_td">{currentTask.startTime}</TableCell>
             <TableCell className="wrap_timer_table_tr_td">{currentTask.endTime}</TableCell>
             <TableCell className="wrap_timer_table_tr_td">{currentTask.spentTime}</TableCell>
           </TableRow>
         </TableBody>
       </Table>
     </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    currentTask: state.currentTask
  }
}

export default connect(mapStateToProps)(TaskInfo);