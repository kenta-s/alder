import React from "react";
import { connect } from "react-redux"

class Tasks extends React.Component {
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
  }
};
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Tasks);
