import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';

// middlewares
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import fsaThunkMiddleware from 'redux-fsa-thunk'; // can process thunks that are fsa

// persistence
import { autoRehydrate, persistStore } from 'redux-persist';
import localforage from 'localforage';

import createRootReducer from 'app/reducers';

export default function configureStore(initialState = {}) {

  let composeEnhancers;

  // DEV MODE -- TOOLS
  if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  } else {
    composeEnhancers = compose;
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(
      autoRehydrate(),
      applyMiddleware(
        routerMiddleware(browserHistory),
        promiseMiddleware,
        fsaThunkMiddleware,
        thunkMiddleware
      )
    )
  );

  persistStore(store, { storage: localforage, whitelist: ['auth'] });

  return store;
};
