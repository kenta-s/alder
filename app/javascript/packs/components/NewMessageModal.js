import React from 'react';
import { connect } from "react-redux"
import {
  postMessage,
} from "../redux/actions/messages"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
}));

const NewMessageModal = ({postMessage}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    username: '',
    message: '',
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    if(values.message === '' || values.username === ''){
      return
    }
    postMessage(values.message, values.username)
      .then(() => {
        setValues({
          username: '',
          message: '',
        })
        handleClose()
      })
  }

  return (
    <div>
      <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>メッセージ送信</h2>
          <TextField
            label="user ID"
            fullWidth
            margin="normal"
            onChange={handleChange('username')}
            value={values.username}
          />
          <TextField
            label="message"
            fullWidth
            margin="normal"
            onChange={handleChange('message')}
            value={values.message}
            multiline
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={submit}>
            送信
          </Button>
        </div>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (content, userName) => dispatch(postMessage(content, userName)),
  }
}

export default connect(
  null,
  mapDispatchToProps 
)(NewMessageModal);
