import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import {
  fetchTasks,
} from "../redux/actions/tasks"

class Tasks extends React.Component {
  componentDidMount() {
    this.props.fetchTasks()
  }
  render(){
	  const tasks = this.props.tasks.map(task => {
		  return(
        <tr key={task.id} style={{cursor: 'pointer'}} onClick={() => this.props.history.push(`/tasks/${task.id}`)}>
          <td>{task.title}</td>
          <td>{task.end_at}</td>
        </tr>
      )
		})
    return(
      <table className="highlight">
        <thead>
          <tr>
              <th>Title</th>
              <th>Expires at</th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps 
)(Tasks));
