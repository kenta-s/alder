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
import { flashMessage } from 'redux-flash'
import { registerUser } from '../redux-token-auth-config'
import {
  redirectUnlessGuest,
} from "../redux/actions/common"
import { Link } from "react-router-dom";

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
  const { registerUser, history, currentUser, redirectUnlessGuest, flashMessage } = props
  const classes = useStyles();
  React.useEffect(() => {
    redirectUnlessGuest(currentUser)
  }, [])
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    // userStatus: 'apprentice', // TODO: handle professional as well
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const signUp = () => {
    registerUser({ email: values.email, name: values.name, password: values.password })
      .then(response => {
        history.push('/thankyou')
      })
      .catch(error => {
        flashMessage('登録に失敗しました。入力内容をご確認ください。', {isError: true})
        console.error(error)
      })
  }

  const validateInputs = () => {
    const nameMt2Length = values.name.length > 2
    const emailNotEmpty = values.email !== ''
    const passwordMt5Length = values.password.length > 5
    const passwordMatchesConfirmation = values.password === values.passwordConfirmation
    return (nameMt2Length && emailNotEmpty && passwordMt5Length && passwordMatchesConfirmation)
  }

  return (
    <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="User ID(3字以上半角英数字)"
          fullWidth
          margin="normal"
          onChange={handleChange('name')}
          value={values.name}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          onChange={handleChange('email')}
          value={values.email}
        />
        <TextField
          label="パスワード(6字以上)"
          fullWidth
          margin="normal"
          type="password"
          onChange={handleChange('password')}
          value={values.password}
        />
        <TextField
          label="パスワード(確認)"
          fullWidth
          margin="normal"
          type="password"
          onChange={handleChange('passwordConfirmation')}
          value={values.passwordConfirmation}
        />
      { /*
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">駆け出し or 現役エンジニア</FormLabel>
          <RadioGroup aria-label="userStatus" name="userStatus" value={values.userStatus} onChange={handleChange('userStatus')}>
            <FormControlLabel value="apprentice" control={<Radio />} label="駆け出し" />
            <FormControlLabel value="professional" control={<Radio />} label="現役エンジニア" />
          </RadioGroup>
        </FormControl>
      */ }
      <Button variant="contained" color="primary" onClick={signUp} disabled={!validateInputs()}>
        サインアップ
      </Button>
      </form>

      <br />

      <Link to='/signin'>
        アカウントをお持ちの方はこちらからログイン
      </Link>
      
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return { 
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (data) => dispatch(registerUser(data)),
    redirectUnlessGuest: currentUser => dispatch(redirectUnlessGuest(currentUser)),
    flashMessage: (message, option) => dispatch(flashMessage(message, option)), 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(UserSignUp);
