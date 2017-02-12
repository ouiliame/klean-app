import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackIcon from 'material-ui/svg-icons/navigation/chevron-left';

import { push } from 'react-router-redux';

const _AppBar = ({ title, push, ...rest}) => (
  <AppBar title={title}
    iconElementLeft={<IconButton><BackIcon /></IconButton>}
    onLeftIconButtonTouchTap={() => push('/route66')} {...rest} />
);

const s2p = s => ({});
const d2p = { push };

export default connect(s2p, d2p)(_AppBar);
