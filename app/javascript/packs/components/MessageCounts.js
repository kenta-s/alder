import React, {useState, useEffect} from 'react';
import { connect } from "react-redux"
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchMessageCounts,
} from "../redux/actions/messageCounts"
import {
  authenticateUser,
} from "../redux/actions/common"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from './Title';
import NewMessageModal from './NewMessageModal';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  row: {
    cursor: 'pointer',
  },
});

function MessageCounts({messageCounts, fetchMessageCounts, history, currentUser, authenticateUser}) {
  const classes = useStyles();
  useEffect(() => {
    if(authenticateUser(currentUser)){
      fetchMessageCounts()
    }
  }, [])

  const rows = messageCounts
  const [isNewMessageModalOpen, openNewMessageModal] = useState(false)

  return (
    <React.Fragment>
      <Title>Messages</Title>
      { rows.length > 0
        ?
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
        { /* <TableCell align="right">unread</TableCell> */ }
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name} className={classes.row} onClick={() => { history.push(`/users/${row.name}/messages`) }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              { /* <TableCell align="right">{row.unreadCount}</TableCell> */ }
              </TableRow>
            ))}
          </TableBody>
        </Table>
        :
        <div>
          メッセージはありません
        </div>
      }
      { (currentUser.attributes.status === 'admin' || currentUser.attributes.status === 'professional') &&
			  <NewMessageModal />
      }
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return { 
    messageCounts: state.messageCounts.data,
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessageCounts: () => dispatch(fetchMessageCounts()),
    authenticateUser: currentUser => dispatch(authenticateUser(currentUser)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps 
)(MessageCounts);
