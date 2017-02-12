import { createActions, handleActions } from 'redux-actions';

import { change, focus } from 'redux-form';

import api from 'app/api';
import { notifyNetworkError } from 'app/actions/notify';

export const actions = createActions({
  // TODO: separate user and token
  AUTHENTICATE: creds => dispatch => {
    api.post('/auth', creds)
    .then( (res) => dispatch(actions.setTokenAndUser(res.data)) )
    .catch((err) => {
      dispatch( notifyNetworkError(err) );
      dispatch( change('loginForm', 'password', '') );
      dispatch( focus('loginForm', 'password') );
    });
  },

  DEAUTHENTICATE: () => {
    return api.get('/deauth')
  }

}, 'SET_TOKEN_AND_USER');

export default handleActions({

  [actions.setTokenAndUser]: (state, { payload }) => ({
    token: payload.token,
    user: payload.user
  }),

  [actions.deauthenticate]: (state, action) => ({})

}, {});
