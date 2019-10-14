import React from "react";
import { connect } from "react-redux"
import { withRouter } from 'react-router'

class Header extends React.Component {
  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">Logo</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#!" onClick={() => this.props.history.push(`/tasks`)} >募集中のタスク</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
          </ul>
        </div>
      </nav>
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps 
)(Header))
