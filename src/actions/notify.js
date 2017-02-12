import { createActions } from 'redux-actions';
import { addNotification as notify } from 'reapop';

const actions = createActions({
  NOTIFY_ERROR: (message = '... error', title="An error has occurred", pos = 'tc') => {
    const options = {
      status: 'error',
      title,
      message,
      position: pos
    }
    return notify(options);
  }
});

export const notifyNetworkError = (err) => {
  if (err.response) {
    return actions.notifyError(err.response.data, 'An error has occurred');
  } else {
    return actions.notifyError(err.message, 'Internal client error');
  }
}

export default actions;
