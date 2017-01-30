import React, { Component } from 'react';

import HomeView from './HomeView';
import EditView from './EditView';
import AnalyzeView from './AnalyzeView';

export default class Route66 extends Component {
  static Home = HomeView;
  static Edit = EditView;
  static AnalyzeView = AnalyzeView;

  render() {
    return (
      <div className="subapp">
        { this.props.children }
      </div>
    );
  }
};
