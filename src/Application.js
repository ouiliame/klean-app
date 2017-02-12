import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { Route, Router, IndexRoute, IndexRedirect, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import NotificationsSystem from 'reapop';
import ReapopWyboTheme from 'reapop-theme-wybo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import kleanMuiTheme from './kleanMuiTheme';

import isEmpty from 'lodash/isEmpty';

import {
  HomePage,
  LoginPage,
  AppPage
} from './pages';

import {
  KleanDB,
  Route66
} from './subapps';

import configureStore from './configureStore';

// See: http://www.material-ui.com/#/get-started/installation
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// See: http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

const NotificationWrapper = (props) => (
  <div>
    <NotificationsSystem theme={ReapopWyboTheme}/>
    { props.children }
  </div>
);

const UserIsAuthd = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  predicate: auth => auth.token && auth.user && auth.user.provider
});

const UserIsNotAuthd = UserAuthWrapper({
  authSelector: state => state.auth,
  redirectAction: routerActions.replace,
  // Want to redirect the user when they are done loading and authenticated
  predicate: auth => isEmpty(auth),
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/home',
  allowRedirectBack: false
});

class Application extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(kleanMuiTheme)}>
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={NotificationWrapper}>

              <IndexRedirect to="home" />
              <Route path="login" component={UserIsNotAuthd(LoginPage)} />

              <Route component={UserIsAuthd(AppPage)}>
                <Route path="home" component={HomePage} />

                <Route path="db/clients">
                  <IndexRoute component={KleanDB.Clients.Index} />
                  <Route path="new" component={KleanDB.Clients.New} />
                  <Route path="show/:id" component={KleanDB.Clients.Show} />
                </Route>


                <Route path="route66">
                  <IndexRoute component={Route66.Home} />
                  <Redirect from="edit/:id" to="edit/:id/info" />
                  <Route path="edit/:id/:section" component={Route66.Edit} />
                  <Route path="analyze/:id" component={Route66.Analyze} />
                </Route>
              </Route>
            </Route>

          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default Application;
