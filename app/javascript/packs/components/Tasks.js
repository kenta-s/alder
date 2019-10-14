import React from "react";
import { connect } from "react-redux"
import {
  fetchTasks,
} from "../redux/actions/tasks"

class Tasks extends React.Component {
  componentDidMount() {
    this.props.fetchTasks()
  }
  render(){
	  const tasks = this.props.tasks.map(task => {
		  // return <li key={task.id}>{task.title}</li>
		  return(
        <tr>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Tasks);
