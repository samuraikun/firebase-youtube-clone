import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AuthModal from './AuthModal';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase/app';
import 'firebase/auth';

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

class NavigationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      user: null,
      visibleModal: false,
    }
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isLogin: true, user: user });
      } else {
        this.setState({ isLogin: false, user: null });
      }
    });
  }

  googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithRedirect(provider);
  }

  googleSignOut = () => {
    firebase.auth().signOut()
      .then(() => window.location.href = '/');
  }

  openModal = () => {
    this.setState({ visibleModal: true });
  }

  closeModal = () => {
    this.setState({ visibleModal: false });
  }

  renderAuthButton = () => {
    const { classes } = this.props;

    return (
      <div>
        <Button color="inherit" className={classes.button} onClick={this.openModal}>登録</Button>
        <Button color="inherit" className={classes.button} onClick={this.openModal}>ログイン</Button>
        <AuthModal
          open={this.state.visibleModal}
          onClose={this.closeModal}
        />
      </div>
    );
  }

  renderUserItem = user => {
    const { classes } = this.props;

    return (
      <div>
        <Button color="inherit" className={classes.button}>
          <Avatar alt="profile image" src={`${user.photoURL}`} className={classes.avatar} />
          {user.displayName}
        </Button>
        <Button color="inherit" className={classes.button} onClick={this.googleSignOut}>Sign Out</Button>
        <Button variant="contained" color="default">
          <Link to="/upload" className={classes.link}>Upload</Link>
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
      </div>
    );
  }

  render() {
    if (this.state.isLogin) {
      return this.renderUserItem(this.state.user);
    } else {
      return this.renderAuthButton();
    }
  }
}

NavigationItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationItem);
