// see https://github.com/callemall/material-ui/issues/2932
import React from 'react';
import { Menu, MenuItem } from 'material-ui/Menu';

const IconField = ({ icon, field }) => (
  <Menu disableAutoFocus={true}>
    <MenuItem leftIcon={icon} disabled={true}>
      { field }
    </MenuItem>
  </Menu>
);

export default IconField;
