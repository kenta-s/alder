import React from 'react';
import { connect } from "react-redux"
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signInUser } from '../redux-token-auth-config'

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
	  console.log('called')
 	  this.props.signInUser({ email:this.state.email, password:this.state.password })
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

export default connect(
  null,
	{ signInUser },
)(UserSignIn);

// const useStyles = makeStyles(theme => ({
//   container: {
//     display: 'flex',
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 200,
//   },
//   dense: {
//     marginTop: 19,
//   },
//   menu: {
//     width: 200,
//   },
// }));
// 
// const classes = useStyles();
// export default function UserSignIn() {
//   const [values, setValues] = React.useState({
//     email: '',
//     password: '',
//   });
// 
//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };
// 
//   const signIn = () => {
//     const csrftoken = document.getElementById('authenticity_token').getAttribute('value');
//     axios.defaults.headers.common['X-CSRF-Token'] = csrftoken
//     // TODO: redirect to /tasks
// 		signInUser({ email:values.email, password:values.password })
// 		  .then(console.log('aaaa'))
// 			.catch(console.log('bbbb'))
//     // axios.post(`/users/sign_in`, {
//     //   user: {
//     //     email: values.email,
//     //     password: values.password,
//     //   }
//     // })
//     // .then(response => {
//     //   console.log(response)
//     // })
//     // .catch(error => {
//     //   console.error(error)
//     // })
//   }
// 
//   return (
//     <form noValidate autoComplete="off">
//       <TextField
//         label="Email or UserID"
//         fullWidth
//         margin="normal"
//         onChange={handleChange('email')}
//         value={values.email}
//       />
//       <TextField
//         label="Password"
//         fullWidth
//         margin="normal"
//         type="password"
//         onChange={handleChange('password')}
//         value={values.password}
//         autoComplete="current-password"
//       />
//       <Button variant="contained" color="primary" onClick={signIn}>
//         ログイン
//       </Button>
//     </form>
//   );
// }
