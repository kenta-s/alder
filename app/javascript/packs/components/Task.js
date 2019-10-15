import React from "react";
import { connect } from "react-redux"
import {
  fetchTasks,
} from "../redux/actions/tasks"
import {
  fetchTaskApplications,
  createTaskApplication,
} from "../redux/actions/taskApplications"
import TaskApplyModal from './TaskApplyModal'
import Button from '@material-ui/core/Button';

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: null,
    };
  }
	applyForTask = (id) => {
    this.props.createTaskApplication(this.props.csrftoken, id)
	}
  componentDidMount() {
    this.props.fetchTasks()
      .then(response => {
        const task = response.data.find(task => task.id === Number(this.props.match.params.id))
        this.setState({task})
      })
    this.props.fetchTaskApplications()
  }
  render(){
    const task = this.state.task
    const taskApplication = task && this.props.taskApplications.find(taskApplication => taskApplication.task_id === task.id)
    return(
      <div>
        {task && <h3>{task.title}</h3>}
        {task && <p>詳細: {task.description}</p>}
        {task && <p>応募期限: {task.end_at}</p>}
        {taskApplication ?
            <div>
              <Button variant="contained" color="secondary" disabled>
                応募済み
              </Button>
            </div>
            :
				    <div>
              {task && <TaskApplyModal task={task} applyForTask={this.applyForTask} />}
				    </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    tasks: state.tasks.data,
    taskApplications: state.taskApplications.data,
    csrftoken: state.csrftoken.token,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
    fetchTaskApplications: () => dispatch(fetchTaskApplications()),
    createTaskApplication: (csrftoken, id) => dispatch(createTaskApplication(csrftoken, id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Task);
