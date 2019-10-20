import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import {
  fetchTask,
  createTaskApplication,
} from "../redux/actions/task"
import TaskApplyModal from './TaskApplyModal'
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class Task extends React.Component {
  constructor(props) {
    super(props);
  }
	applyForTask = (taskId) => {
    this.props.createTaskApplication(taskId)
	}
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id)
  }
  render(){
    const task = this.props.task
    const currentUser = this.props.currentUser
    const applied = task.taskApplications.some(application => application.applicant_name === currentUser.name)
    return(
      <div key={task.taskApplications.length}>
        <h3>{task.title}</h3>
        <p>詳細: {task.description}</p>
        <p>応募期限: {task.expiresAt}</p>
        { currentUser.status !== 'professional' && currentUser.status !== 'admin' ?
          <div>
            { applied ?
                <Button variant="contained" color="secondary" disabled>
                  応募済み
                </Button>
              :
                <TaskApplyModal task={task} applyForTask={this.applyForTask} />
            }
          </div>
          :
          <div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell>status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {task.taskApplications.map(app => (
                  <TableRow key={app.id}>
                    <TableCell>{app.applicant_name}</TableCell>
                    <TableCell>{app.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    task: state.task,
    currentUser: state.reduxTokenAuth.currentUser.attributes,
    // taskApplications: state.taskApplications.data,
    // csrftoken: state.csrftoken.token,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTask: id => dispatch(fetchTask(id)),
    // fetchTaskApplications: () => dispatch(fetchTaskApplications()),
    createTaskApplication: (csrftoken, id) => dispatch(createTaskApplication(csrftoken, id)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps 
)(Task));
