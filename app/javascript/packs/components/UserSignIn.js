import React from 'react';
import axios from 'axios'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function TextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const signIn = () => {
    const csrftoken = document.getElementById('authenticity_token').getAttribute('value');
    axios.defaults.headers.common['X-CSRF-Token'] = csrftoken
    // TODO: redirect to /tasks
    return axios.post(`/users/sign_in`, {
      user: {
        email: values.email,
        password: values.password,
      }
    })
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
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
        autoComplete="current-password"
      />
      <Button variant="contained" color="primary" onClick={signIn}>
        ログイン
      </Button>
    </form>
  );
}
