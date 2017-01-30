import { addNotification as notify } from 'reapop';

export const notifyError = (err) => {
  var options = {
    status: 'error',
    position: 'tc'
  };

  if (err.response) {
    options.title = "An error has occured";
    options.message = err.response.data;
  } else {
    options.title = "Unable to connect";
    options.message = err.message;
  }

  return notify(options);
};
