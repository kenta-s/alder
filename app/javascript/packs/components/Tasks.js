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
    return(
      <div>
        you will see some tasks here
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
)(Tasks);
