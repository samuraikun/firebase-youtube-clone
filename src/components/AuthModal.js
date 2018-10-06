import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'firebase/auth';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialogTitle: {
    textAlign: 'center'
  }
};

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

class AuthModal extends Component {
  state = {
    open: false,
  }

  handleClose = () => {
    this.props.onClose();
  }

  render() {
    const { classes, onClose, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="login-dialog-title" className={classes.dialogTitle}>ログイン</DialogTitle>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </Dialog>
    );
  }
}

AuthModal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(AuthModal);
