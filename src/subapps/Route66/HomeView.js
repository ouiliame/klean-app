import React, { Component } from 'react';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import NavAppBar from 'app/components/NavAppBar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';


class HomeView extends Component {

  newProject = () => {
    this.props.push('route66/edit/3');
  }

  render() {
    return (
      <div className="view">
        <NavAppBar title="Route Optimizer"
          iconElementRight={<FlatButton label="New Project" onTouchTap={this.newProject}/>} />
        <List>
          <Subheader>Your saved projects</Subheader>
          <ListItem disabled primaryText="You have no route optimization projects."/>
        </List>
      </div>
    );
  }
};


export default connect(s => ({}), { push })(HomeView);
