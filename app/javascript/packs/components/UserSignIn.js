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
import {
  redirectUnlessGuest,
} from "../redux/actions/common"

class UserSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidUpdate(){
    this.props.redirectUnlessGuest(this.props.currentUser)
  }

  handleChange = name => event => {
		this.setState({
		  [name]: event.target.value,
		})
  };

  signIn = (e) => {
    e.preventDefault()
 	  this.props.signInUser({ email:this.state.email, password:this.state.password })
      .then(response => {
        this.props.history.push('/tasks')
        this.props.flashMessage('ログインしました')
      })
      .catch(() => {
        this.props.flashMessage('メールアドレスまたはパスワードが間違っています', {isError: true})
      })
  }

	render(){
	  return(
      <form noValidate autoComplete="off" onSubmit={this.signIn}>
        <TextField
          label="Email"
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
        <Button type="submit" variant="contained" color="primary">
          ログイン
        </Button>
      </form>
		)
	}
}

const mapStateToProps = state => {
  return { 
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    flashMessage: (message, option) => dispatch(flashMessage(message, option)), 
    signInUser: (data) => dispatch(signInUser(data)),
    redirectUnlessGuest: currentUser => dispatch(redirectUnlessGuest(currentUser)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(UserSignIn);
