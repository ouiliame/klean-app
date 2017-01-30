import React, { Component } from 'react';

import HomeView from './HomeView';
import RIndexView from './RIndexView';
import RNewView from './RNewView';
import RShowView from './RShowView';

export default class KleanDB extends Component {
  static Home = HomeView;
  static RIndex = RIndexView;
  static RNew = RNewView;
  static RShow = RShowView;

  render() {
    return (
      <div className="subapp">
        { this.props.children }
      </div>
    );
  }
};
