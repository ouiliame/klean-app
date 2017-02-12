import React, { Component } from 'react';
import { connect } from 'react-redux';

import { push } from 'react-router-redux';

import { actions as authActions } from 'app/reducers/auth';
import { actions as menuActions } from 'app/reducers/menu';

import { confirm } from 'material-ui-dialogs';

import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import FontIcon from 'material-ui/FontIcon';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import ExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';
import TrackChangesIcon from 'material-ui/svg-icons/action/track-changes';
import HomeIcon from 'material-ui/svg-icons/action/home';
import EventIcon from 'material-ui/svg-icons/action/event';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant';
import PersonPinIcon from 'material-ui/svg-icons/maps/person-pin';
import LocalShippingIcon from 'material-ui/svg-icons/maps/local-shipping';

class AppPage extends Component {

  navigate = (loc) => {
    this.props.toggleMenu(false);
    this.props.push(loc);
  }

  handleMenuItem = (event, { props }) => {
    const value = props.value;
    if (value) {
      this.navigate(value);
    }
  }

  handleSignout = () => {
    confirm("Are you sure?", "Please confirm that you want to sign out.")
      .then((res) => res ? this.props.deauthenticate() : null);
  }

  render() {

    return (
      <div className="app">

        <Drawer
          docked={false}
          width={335}
          open={this.props.isOpen}
          onRequestChange={this.props.toggleMenu} >

          <Card zDepth={0} >
            <br />
            <CardHeader
              actAsExpander
              showExpandableButton
              title="Bryan Melgar"
              titleStyle={{marginBottom: 5}}
              subtitle="UXRG EnviroKlean"
              avatar="/images/avatar.png"
              />
            <CardActions expandable style={{ display: 'flex', justifyContent: 'center' }}>
              <FlatButton primary label="My Account" icon={<AccountCircleIcon />} />
              <FlatButton secondary label="Sign out" icon={<ExitToAppIcon />} onTouchTap={this.handleSignout} />
            </CardActions>
          </Card>
          <Menu onItemTouchTap={this.handleMenuItem}>
            <MenuItem leftIcon={<HomeIcon />} primaryText="Home" value="/home"/>
            <MenuItem disabled leftIcon={<EventIcon />} primaryText="Calendar" value="/calendar" />
            <MenuItem leftIcon={<StorageIcon />} primaryText="Database" menuItems={[
                <MenuItem leftIcon={<RestaurantIcon />} primaryText="Clients" onTouchTap={() => this.navigate('/db/clients')} />,
                <MenuItem leftIcon={<PersonPinIcon />} primaryText="Drivers" onTouchTap={() => this.navigate('/db/drivers')} />,
                <MenuItem leftIcon={<LocalShippingIcon />} primaryText="Vehicles" onTouchTap={() => this.navigate('/db/vehicles')} />
            ]}/>

          <Subheader>Deployment Tools</Subheader>
            <MenuItem disabled leftIcon={<TrackChangesIcon />} primaryText="Status Monitor" value="/monitor" />
            <MenuItem leftIcon={<FontIcon className="fa fa-magic" />} primaryText="Route Optimizer" value="/route66"/>
          </Menu>
        </Drawer>
        { this.props.children }
      </div>
    );
  }
}

export default connect(s => ({ isOpen: s.menu.isOpen }),
{ push, deauthenticate: authActions.deauthenticate, toggleMenu: menuActions.toggleMenu })(AppPage);
