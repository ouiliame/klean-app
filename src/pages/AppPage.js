import React, { Component } from 'react';

export default class AppPage extends Component {
  render() {
    return (
      <div className="app">
        { this.props.children }
      </div>
    );
  }
}
