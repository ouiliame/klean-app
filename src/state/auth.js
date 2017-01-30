import { createActions, handleActions } from 'redux-actions';
import api from 'app/api';
import { change, focus } from 'redux-form';
import { notifyError } from 'app/util/notifyHelpers';

export const actions = createActions({
  AUTHENTICATE: (creds) => {
    return (dispatch) => {
      api.post('/auth', creds)
      .then( (res) => dispatch(actions.setTokenAndUser(res.data)) )
      .catch((err) => {
        dispatch(notifyError(err));
        dispatch(change('loginForm', 'password', ''));
        dispatch(focus('loginForm', 'password'));
      });
    };
  },

  DEAUTHENTICATE: () => api.get('/deauth')
}, 'SET_TOKEN_AND_USER');

export default handleActions({
  SET_TOKEN_AND_USER: (state, { payload }) => ({
    token: payload.token,
    user: payload.user
  }),
}, {});
