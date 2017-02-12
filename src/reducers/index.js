import { combineReducers } from 'redux';

// local reducers
import auth from 'app/reducers/auth';
import menu from 'app/reducers/menu';

// 3rd party reducers
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as notificationsReducer } from 'reapop';

export default function createRootReducer() {
  return combineReducers({
    // local
    auth,
    menu,

    // 3rd party
    notifications: notificationsReducer(),
    form: formReducer,
    routing: routerReducer
  });
}
