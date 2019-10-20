import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { signOutUser } from '../redux-token-auth-config'
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import { flashMessage } from 'redux-flash'

const SidebarSecondListItems = ({signOutUser, history, flashMessage}) => {
  const logout = () => {
    signOutUser()
      .then(() => {
        history.push('/signin')
        flashMessage('ログアウトしました')
      })
      .catch(error => console.error(error))
  }

  return (
    <List>
      <div>
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="ログアウト" />
        </ListItem>
      </div>
    </List>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    flashMessage: (message) => dispatch(flashMessage(message)), 
    signOutUser: () => dispatch(signOutUser()),
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(SidebarSecondListItems));
