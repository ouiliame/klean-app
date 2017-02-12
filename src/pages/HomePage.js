import React, { Component } from 'react';
import NavAppBar from 'app/components/NavAppBar';
export default class HomePage extends Component {

  render() {
    return (
      <div className="page">
        <NavAppBar title="Home" />
        Home
      </div>
    );
  }
}
