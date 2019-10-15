import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { getFlashMessages } from 'redux-flash'
import { connect } from "react-redux"

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

// export default function FlashMessages({variant, message, isOpen}) {
//   const classes = useStyles2();
//   const [setOpen] = React.useState(false);
//   const [open] = React.useState(isOpen);
// 
//   const handleClick = () => {
//     setOpen(true);
//   };
// 
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
// 
//     setOpen(false);
//   };
// 
//   return (
//     <div>
//       <Snackbar
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         open={open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//       >
//         <MySnackbarContentWrapper
//           onClose={handleClose}
//           variant={variant}
//           message={message}
//         />
//       </Snackbar>
//     </div>
//   );
// }

class FlashMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
    };
  }

  handleClose = () => {
  console.log('called')
    this.setState({isOpen: false})
  }

  render(){
    const successFlash = this.props.flash.filter(flash => !flash.isError)
    const errorFlash = this.props.flash.filter(flash => flash.isError)

    var successMessages = []
    successFlash.forEach((flash, i) => {
      successMessages.push(
        <Snackbar
			  	key={i}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isOpen}
          autoHideDuration={6000}
        >
          <MySnackbarContentWrapper
            variant="success"
            message={flash.message}
            onClose={this.handleClose}
          />
        </Snackbar>
      )
    })

    var errorMessages = []
    errorFlash.forEach((flash, i) => {
      errorMessages.push(
        <Snackbar
			  	key={i}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.isOpen}
          autoHideDuration={6000}
        >
          <MySnackbarContentWrapper
            variant="error"
            message={flash.message}
            onClose={this.handleClose}
          />
        </Snackbar>
      )
    })

    return(
      <React.Fragment>
        {successMessages}
        {errorMessages}
      </React.Fragment>
    )
  }

}

const mapStateToProps = state => {
  return { 
    flash: getFlashMessages(state),
  }
};

export default connect(mapStateToProps)(FlashMessages)