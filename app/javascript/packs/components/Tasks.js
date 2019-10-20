import React from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import {
  fetchTasks,
} from "../redux/actions/tasks"
import {
  authenticateUser,
} from "../redux/actions/common"

class Tasks extends React.Component {
  componentDidMount() {
    if(this.props.authenticateUser(this.props.currentUser)){
      this.props.fetchTasks()
    }
  }
  render(){
    const tasks = this.props.tasks
    return(
      <React.Fragment>
        <Title>Tasks</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Expires at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id} hover style={{cursor: 'pointer'}} onClick={() => this.props.history.push(`/tasks/${task.id}`)}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.end_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { 
    tasks: state.tasks.data,
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
    authenticateUser: currentUser => dispatch(authenticateUser(currentUser)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps 
)(Tasks));
