import React, { Component } from 'react';

import ClientsIndex from './clients/ClientsIndex';
import ClientsNew from './clients/ClientsNew';
import ClientsShow from './clients/ClientsShow';


export default class KleanDB extends Component {

  static Clients = {
    Index: ClientsIndex,
    New: ClientsNew,
    Show: ClientsShow
  }

  render() {
    return (
      <div className="subapp">
        { this.props.children }
      </div>
    );
  }
};
