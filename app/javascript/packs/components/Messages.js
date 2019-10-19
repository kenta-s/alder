import React, {useState, useEffect} from 'react';
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchMessages,
} from "../redux/actions/messages"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Title from './Title';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function Messages({messages, fetchMessages}) {
  const classes = useStyles();
  useEffect(() => {
    fetchMessages()
  }, [])

  const [newMessage, setNewMessage] = useState('')
  const rows = messages
  const sendMessage = () => {
    console.log('called')
    console.log(newMessage)
    setNewMessage('')
  }

  return (
    <React.Fragment>
      <Title>Messages</Title>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>content</TableCell>
            <TableCell align="right">sent at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.content}
              </TableCell>
              <TableCell align="right">{row.sentAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TextField
        label="message"
        fullWidth
        margin="normal"
        onChange={(e) => { setNewMessage(e.target.value) }}
        value={newMessage}
        multiline
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={sendMessage} disabled={newMessage === ''}>
        送信
      </Button>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return { 
    messages: state.messages.data,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchMessages()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(Messages);
