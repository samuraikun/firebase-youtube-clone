import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  TextField,
  InputAdornment,
  Button
} from '@material-ui/core';
import { MailOutline, VpnKey } from '@material-ui/icons';
import firebase from 'firebase/app';
import 'firebase/auth';

const styles = theme => ({
  itemContainer: {
    textAlign: 'center'
  },
  textField: {
    margin: theme.spacing.unit,
  },
  submitButton: {
    textAlign: 'center',
    margin: theme.spacing.unit
  }
});

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  }

  loginWithEmailAndPassword = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      window.location.href = '/';
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          window.error = err;
          console.log(err);
          console.log(err.message);
          break;
        case 'auth/invalid-email':
          window.error = err;
          console.log(err);
          console.log(err.message);
          break;
        case 'auth/operation-not-allowed':
          window.error = err;
          console.log(err);
          console.log(err.message);
          break;
        case 'auth/weak-password':
          window.error = err;
          console.log(err);
          console.log(err.message);
          break;
        default:
          console.log(err);
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.itemContainer}>
        <TextField
          className={classes.textField}
          id="input-email-with-icon"
          label="メールアドレス"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
          onChange={this.handleChange('email')}
        />
        <TextField
          className={classes.textField}
          id="input-password-with-icon"
          label="パスワード"
          type="password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            ),
          }}
          onChange={this.handleChange('password')}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.submitButton}
          type="submit"
          onClick={() => this.loginWithEmailAndPassword(this.state.email, this.state.password)}
        >
          ログインする
        </Button>
      </FormControl>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginForm);
