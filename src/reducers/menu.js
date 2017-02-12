import { createActions, handleActions } from 'redux-actions';
import { actions as authActions } from 'app/reducers/auth';

export const actions = createActions({}, "TOGGLE_MENU");

export default handleActions({
  [authActions.deauthenticate]: (state, action) => ({ isOpen: false }),

  [actions.toggleMenu]: (state, { payload }) => {
    if (payload) {
      return {
        ...state,
        isOpen: payload
      };
    } else {
      return {
        ...state,
        isOpen: !state.isOpen
      };
    }
  }
}, { isOpen: false });
