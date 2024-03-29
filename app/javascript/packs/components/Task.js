import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import {
  fetchTask,
  createTaskApplication,
} from "../redux/actions/task"
import {
  authenticateUser,
} from "../redux/actions/common"
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
    if(this.props.authenticateUser(this.props.currentUser)){
      this.props.fetchTask(this.props.match.params.id)
    }
  }
  render(){
    const task = this.props.task
    const currentUser = this.props.currentUser.attributes
    const applied = task.taskApplications.some(application => application.applicant_name === currentUser.name)
    const description = task.description.split("\n").map((line, i) => {
      return(
        <React.Fragment key={`description-${i}`}>
          {line}
          <br />
        </React.Fragment>
      )
    })
    return(
      <div key={task.taskApplications.length}>
        <h3>{task.title}</h3>
        <p>ステータス: {task.status == 'open' ? '募集中' : '締め切りました'}</p>
        <p>{description}</p>
        { currentUser.status !== 'professional' && currentUser.status !== 'admin' ?
          <div>
            { task.status == 'closed'
              ?
                <Button variant="contained" color="secondary" disabled>
                  締め切りました
                </Button>
              :
                <React.Fragment>
                  { applied
                    ?
                      <Button variant="contained" color="secondary" disabled>
                        応募済み
                      </Button>
                    :
                      <TaskApplyModal task={task} applyForTask={this.applyForTask} />
                  }
                </React.Fragment>
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
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTask: id => dispatch(fetchTask(id)),
    createTaskApplication: (csrftoken, id) => dispatch(createTaskApplication(csrftoken, id)),
    authenticateUser: currentUser => dispatch(authenticateUser(currentUser)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps 
)(Task));
