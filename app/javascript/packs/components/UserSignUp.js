import React from 'react';
import { connect } from "react-redux"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { registerUser } from '../redux-token-auth-config'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const UserSignUp = (props) => {
  const { registerUser, history } = props
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    userStatus: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const signUp = () => {
    registerUser({ email: values.email, name: values.name, password: values.password, status: values.userStatus })
      .then(response => {
        history.push('/thankyou')
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="user ID"
          fullWidth
          margin="normal"
          onChange={handleChange('name')}
          value={values.name}
        />
        <TextField
          label="Email or UserID"
          fullWidth
          margin="normal"
          onChange={handleChange('email')}
          value={values.email}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          onChange={handleChange('password')}
          value={values.password}
        />
        <TextField
          label="Password Confirmation"
          fullWidth
          margin="normal"
          type="password"
          onChange={handleChange('passwordConfirmation')}
          value={values.passwordConfirmation}
        />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">駆け出し or 現役エンジニア</FormLabel>
          <RadioGroup aria-label="userStatus" name="userStatus" value={values.userStatus} onChange={handleChange('userStatus')}>
            <FormControlLabel value="apprentice" control={<Radio />} label="駆け出し" />
            <FormControlLabel value="professional" control={<Radio />} label="現役エンジニア" />
          </RadioGroup>
        </FormControl>
      </form>
      <Button variant="contained" color="primary" onClick={signUp} disabled={!(values.name !== '' && values.email !== '' && values.password !== '' && values.passwordConfirmation !== '' && values.userStatus !== '' && values.password === values.passwordConfirmation)}>
        サインアップ
      </Button>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (data) => dispatch(registerUser(data)),
  }
}

export default connect(
  null,
  { registerUser } 
)(UserSignUp);
