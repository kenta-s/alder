import React from 'react';
import { connect } from "react-redux"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
}));

const NavbarMenu = ({open, handleDrawerOpen, currentUser}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      { currentUser.isSignedIn && window.location.pathname !== '/thankyou' && window.location.pathname !== '/signup' &&
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
      }
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return { 
    currentUser: state.reduxTokenAuth.currentUser,
  }
};

export default connect(
  mapStateToProps,
  null 
)(NavbarMenu);
