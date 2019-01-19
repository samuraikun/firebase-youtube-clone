import React, { Component } from 'react';
import UserItem from './UserItem';
import AuthButton from './AuthButton';

class NavigationItem extends Component {
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
    const { auth, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    if (authenticated) {
      return this.renderUserItem(profile);
    } else {
      return this.renderAuthButton();
    }
  }
}

export default NavigationItem;
