import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import {
  fetchTask,
  createTaskApplication,
} from "../redux/actions/task"
// import {
//   fetchTaskApplications,
// } from "../redux/actions/taskApplications"
import TaskApplyModal from './TaskApplyModal'
import Button from '@material-ui/core/Button';

class Task extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   task: null,
    // };
  }
	applyForTask = (taskId) => {
    this.props.createTaskApplication(taskId)
	}
  componentDidMount() {
    this.props.fetchTask(this.props.match.params.id)
  }
  render(){
    const task = this.props.task
    const taskApplication = false
    const applied = task.taskApplications.some(application => application.applicant_name === this.props.currentUser.name)
    // const taskApplication = task && this.props.taskApplications.find(taskApplication => taskApplication.task_id === task.id)
    return(
      <div key={task.taskApplications.length}>
        <h3>{task.title}</h3>
        <p>詳細: {task.description}</p>
        <p>応募期限: {task.expiresAt}</p>
        {applied ?
          <div>
            <Button variant="contained" color="secondary" disabled>
              応募済み
            </Button>
          </div>
          :
				  <div>
            <TaskApplyModal task={task} applyForTask={this.applyForTask} />
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
