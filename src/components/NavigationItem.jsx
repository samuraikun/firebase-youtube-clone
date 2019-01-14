import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import UserItem from './UserItem';
import AuthButton from './AuthButton';

class NavigationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      user: null,
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

  renderAuthButton = () => {
    return (
      <AuthButton />
    );
  }

  renderUserItem = user => {
    return (
      <UserItem user={user} />
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

export default NavigationItem;
