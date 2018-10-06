import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AuthModal from './AuthModal';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

class AuthButton extends Component {
  constructor(props) {
    super(props);

    this.state = { visibleModal: false }
  }

  openModal = () => {
    this.setState({ visibleModal: true });
  }

  closeModal = () => {
    this.setState({ visibleModal: false });
  }

  render() {
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
}

AuthButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthButton);
