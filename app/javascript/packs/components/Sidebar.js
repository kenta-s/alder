import React from "react";
import { connect } from "react-redux"
import {SideNav, SideNavItem, Button} from 'react-materialize'

class Sidebar extends React.Component {
  render(){
    return(
      <ul className="sidenav sidenav-fixed" style={{marginTop: '64px', zIndex:'-1'}}>
        <li>
          aaa
        </li>
        <li>
          aaa
        </li>
        <li>
          aaa
        </li>
      </ul>
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
)(Sidebar);
