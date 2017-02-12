import React, { Component } from 'react';

import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form';

import { actions as authActions } from 'app/reducers/auth';

import {
  TextField,
  Checkbox
} from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import './LoginPage.css';

const form = ({handleSubmit, submitting}) => (
  <form className="form" onSubmit={handleSubmit}>
    <img className="logo" src="/images/login-logo.svg" /><br/>
    <Field className="text-field" name="email" type="email" disabled={submitting}
      component={TextField} floatingLabelText="Email Address" />
    <Field className="text-field" name="password" type="password" disabled={submitting}
      component={TextField} floatingLabelText="Password" />
    <Field className="checkbox" name="rememberMe" component={Checkbox} label="Remember me on this browser"/>
    <RaisedButton type="submit" disabled={submitting} className="button" primary label="Authenticate" />
  </form>
);

const LoginForm = reduxForm({form: 'loginForm'})(form);

class LoginPage extends Component {

  _validate = (values) => {
    const errors = {};
    if (!values.email)
      errors.email = "Email is required.";
    else if (!validator.isEmail(values.email))
      errors.email = "Please enter a valid email."

    if (!values.password)
      errors.password = "Password is required.";
    else if (!validator.isLength(values.password, {min: 8}))
      errors.password = "Passwords are length 8 or greater.";

    return errors;
  }

  _doLogin = (values, dispatch) => {
    const errors = this._validate(values);
    if (isEmpty(errors)) dispatch( authActions.authenticate(values) );
    else throw new SubmissionError(errors);
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.replace('/home');
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className='login-page'>
        <div>
          <Paper className='form-paper' zDepth={2}>
            {
              (!isLoggedIn && <LoginForm onSubmit={this._doLogin} />)
              || <CircularProgress size={80} thickness={5} />
            }
          </Paper>
            { !isLoggedIn && <FlatButton primary className="help-button" label="I can't access my account" /> }
        </div>
      </div>
    );
  }
}

const s2p = (state) => ({
  isLoggedIn: state.auth.token && !isEmpty(state.auth.user)
});

const d2p = {
  replace
};

export default connect(s2p, d2p)(LoginPage);
