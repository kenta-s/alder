import React from "react";
import { connect } from "react-redux"
// import { Button, Modal } from "react-materialize"
import {
  fetchTasks,
} from "../redux/actions/tasks"
import TaskApplyModal from './TaskApplyModal'

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: null,
    };
  }
	applyForTask = (id) => {
	console.log(id)
	}
  componentDidMount() {
    this.props.fetchTasks()
      .then(response => {
        const task = response.data.find(task => task.id === Number(this.props.match.params.id))
        this.setState({task})
      })
  }
  render(){
    const task = this.state.task
    return(
      <div>
        {task && <h3>{task.title}</h3>}
        {task && <p>詳細: {task.description}</p>}
        {task && <p>応募期限: {task.end_at}</p>}
				{task && <TaskApplyModal task={task} applyForTask={this.applyForTask} />}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { 
    tasks: state.tasks.data,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: () => dispatch(fetchTasks()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Task);

