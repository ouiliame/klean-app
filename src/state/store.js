import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
// here: import app reducers
import auth from './auth';

// here: import 3rd party reducers
import { routerReducer, routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import fsaThunkMiddleware from 'redux-fsa-thunk';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';

const reducer = combineReducers({
  // local reducers
  auth,

  // 3rd party
  notifications: notificationsReducer(),
  form: formReducer,
  routing: routerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(browserHistory),
      promiseMiddleware,
      thunkMiddleware,
      fsaThunkMiddleware
    )
  )
);

export default store;
