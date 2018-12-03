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

    this.state = { visibleModal: false, title: '' }
  }

  openModal = modalTitle => {
    this.setState({ visibleModal: true, title: modalTitle });
  }

  closeModal = () => {
    this.setState({ visibleModal: false, modalTitle: '' });
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button color="inherit" className={classes.button} onClick={() => this.openModal('登録')}>登録</Button>
        <Button color="inherit" className={classes.button} onClick={() => this.openModal('ログイン')}>ログイン</Button>
        <AuthModal
          open={this.state.visibleModal}
          onClose={this.closeModal}
          title={this.state.title}
        />
      </div>
    );
  }
}

AuthButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthButton);
