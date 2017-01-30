import React, { Component } from 'react';
import { Route, Router, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider, connect } from 'react-redux';

import NotificationsSystem from 'reapop';
import ReapopWyboTheme from 'reapop-theme-wybo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import kleanMuiTheme from './kleanMuiTheme';

import {
  HomePage,
  LoginPage,
  AppPage
} from './pages';

import {
  KleanDB,
  Route66
} from './subapps';

import store from './state/store';

// See: http://www.material-ui.com/#/get-started/installation
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

const NotificationWrapper = (props) => (
  <div>
    <NotificationsSystem theme={ReapopWyboTheme}/>
    { props.children }
  </div>
);

class Application extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(kleanMuiTheme)}>
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={NotificationWrapper}>

              <IndexRedirect to="login" />
              <Route path="login" component={LoginPage} />

              <Route component={AppPage}>
                <Route path="home" component={HomePage} />
                <Route path="map" />
                <Route path="db" component={KleanDB}>
                  <IndexRoute component={KleanDB.Home} />
                  <Route path=":resource">
                    <IndexRoute component={KleanDB.RIndex} />
                    <Route path="new" component={KleanDB.RNew} />
                    <Route path="show/:id" component={KleanDB.RShow} />
                  </Route>
                </Route>

                <Route path="route66" component={Route66}>
                  <IndexRoute component={Route66.Home} />
                  <Route path="edit/:id" component={Route66.Edit}>
                    <IndexRedirect to="fleet" />
                    <Route path="fleet" />
                    <Route path="jobs" />
                    <Route path="review" />
                  </Route>
                  <Route path="analyze/:id" component={Route66.Analyze}/>
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
