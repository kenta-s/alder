import React from 'react';
import { connect } from "react-redux"
import { withRouter } from 'react-router'
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signInUser } from '../redux-token-auth-config'
import { flashMessage } from 'redux-flash'

class UserSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = name => event => {
		this.setState({
		  [name]: event.target.value,
		})
  };

  signIn = () => {
 	  this.props.signInUser({ email:this.state.email, password:this.state.password })
      .then(response => {
        this.props.history.push('/tasks')
        this.props.flashMessage('ログインしました')
      })
      .catch(error => {
        console.log('error')
      })
  }

	render(){
	  return(
      <form noValidate autoComplete="off">
        <TextField
          label="Email or UserID"
          fullWidth
          margin="normal"
          onChange={this.handleChange('email')}
          value={this.state.email}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          onChange={this.handleChange('password')}
          value={this.state.password}
          autoComplete="current-password"
        />
        <Button variant="contained" color="primary" onClick={this.signIn}>
          ログイン
        </Button>
      </form>
		)
	}
}

const mapDispatchToProps = dispatch => {
  return {
    flashMessage: (message) => dispatch(flashMessage(message)), 
    signInUser: (data) => dispatch(signInUser(data)),
  }
}

export default connect(
  null,
  mapDispatchToProps 
)(UserSignIn);