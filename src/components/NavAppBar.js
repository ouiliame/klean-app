import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';

import { actions } from 'app/reducers/menu';

const _AppBar = ({ title, toggleMenu, ...rest}) => (
  <AppBar title={title} onLeftIconButtonTouchTap={toggleMenu} {...rest} />
);

const s2p = s => ({});
const d2p = { toggleMenu: actions.toggleMenu }

export default connect(s2p, d2p)(_AppBar);
