import React from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom";
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

const Thankyou = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div>
        仮登録メールを送信しました。<br />
        メールが届かない場合は迷惑メールフォルダをご確認ください。<br />
        <a href='/'>
          TOPへ
        </a>
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  null,
  mapDispatchToProps 
)(Thankyou);
