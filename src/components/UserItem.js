import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase/app';
import 'firebase/auth';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  avatar: {
    margin: 10,
    backgroudColor: 'white',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
});

class UserItem extends Component {
  googleSignOut = () => {
    firebase.auth().signOut()
      .then(() => window.location.href = '/');
  }

  render() {
    const { classes, user } = this.props;
    const defaultUserName = '名無しさん';
    const defaultUserIcon = 'https://firebasestorage.googleapis.com/v0/b/fir-clone-1a266.appspot.com/o/default-user-icons%2F1.png?alt=media&token=b5e090f4-d2b1-4544-92bd-379a3d22b470';

    return (
      <div>
        <Button color="inherit" className={classes.button}>
          <Avatar alt="profile image" src={`${user.photoURL || defaultUserIcon}`} className={classes.avatar} />
          {user.displayName || defaultUserName}
        </Button>
        <Button color="inherit" className={classes.button} onClick={this.googleSignOut}>ログアウト</Button>
        <Button variant="contained" color="default">
          <Link to="/upload" className={classes.link}>Upload</Link>
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </div>
    );
  }
}

UserItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserItem);
