import React, {useState, useEffect} from 'react';
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchMessages,
  postMessage,
} from "../redux/actions/messages"
import {
  authenticateUser,
} from "../redux/actions/common"
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
  myCard: {
    backgroundColor: '#2196F3',
    color: '#FFFFFF',
  },
  message: {
    marginBottom: 8,
  },
});

function Messages({messages, fetchMessages, postMessage, match, currentUser, authenticateUser}) {
  const classes = useStyles();
  useEffect(() => {
    if(authenticateUser(currentUser)){
      fetchMessages()
    }
  }, [])

  const [newMessage, setNewMessage] = useState('')
	const userName = match.params.name
  const rows = messages.map((message, i) => {
    if(message.senderName === userName){
      return(
        <Grid container direction="row" key={`message-${i}`} className={classes.message}>
          <Grid item xs={10} sm={8} md={6}>
            <Card>
              <CardContent>
                {message.content}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )
    }else if(message.recipientName === userName){
      return(
        <Grid container direction="row-reverse" key={`message-${i}`} className={classes.message}>
          <Grid item xs={10} sm={8} md={6}>
            <Card className={classes.myCard}>
              <CardContent>
                {message.content}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )
    }
	})
  const sendMessage = () => {
    postMessage(newMessage, match.params.name).then(response => {
      setNewMessage('')
    })
  }

  return (
    <React.Fragment>
      <Title>Messages</Title>
      {rows}

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
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchMessages()),
    postMessage: (content, userName) => dispatch(postMessage(content, userName)),
    authenticateUser: currentUser => dispatch(authenticateUser(currentUser)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps 
)(Messages));
