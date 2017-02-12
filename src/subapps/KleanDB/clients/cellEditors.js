import React, { Component } from 'react';
import moment from 'moment';

export class DateEditor extends Component {

  constructor(props) {
    super(props);
    this.okayed = false; // only change upon OK
    this.state = {
      value: moment(this.props.value).format('YYYY-MM-DD')
    }
  }

  handleChange = (ev) => {
    this.setState({value: ev.target.value});
  }

  handleOK = () => {
    this.okayed = true;
    this.props.stopEditing();
  }

  handleCancel = () => {
    this.props.stopEditing();
  }

  isCancelAfterEnd() {
    return !this.okayed;
  }

  render() {
    return (
      <div style={{backgroundColor: 'white', padding: 5}}>
        <input ref="input" type="date" value={this.state.value} onChange={this.handleChange} onSubmit={null} /> 
        <button onClick={this.handleOK}>OK</button>
        <button onClick={this.handleCancel}>X</button>
      </div>
    );
  }

  isPopup() {
    return true;
  }

  getValue() {
    return moment(this.state.value).toDate();
  }
}


export class NameEditor extends Component {

  constructor(props) {
    super(props);
    this.okayed = false;
    this.state = {
      value: this.props.value
    }
  }

  handleChange = (ev) => {
    this.setState({value: ev.target.value});
  }

  isCancelAfterEnd() {
    return !this.okayed;
  }

  handleOK = () => {
    this.okayed = true;
    this.props.stopEditing();
  }

  handleCancel = () => {
    this.props.stopEditing();
  }

  render() {
    return (
      <div style={{background: 'white', padding: 5}}>
        <textarea rows={3} cols={40} onChange={this.handleChange} onKeyDown={this.onKeyDown} value={this.state.value}></textarea>
        <br/>
        <button onClick={this.handleOK}>OK</button>
        <button onClick={this.handleCancel}>Cancel</button>
        <span style={{float: 'right', color: "#1088bb"}}>
          <i><b>will be geocoded</b></i>
        </span>
      </div>
    );
  }

  onKeyDown(ev) {
    ev.stopPropagation();
  }

  isPopup() {
    return true;
  }

  getValue() {
    return this.state.value;
  }
}

export class AddressEditor extends Component {

  constructor(props) {
    super(props);
    this.okayed = false;
    this.state = {
      value: this.props.node.data.address
    }
  }

  handleChange = (ev) => {
    this.setState({value: ev.target.value});
  }

  isCancelAfterEnd() {
    return !this.okayed;
  }

  handleOK = () => {
    this.okayed = true;
    this.props.stopEditing();
  }

  handleCancel = () => {
    this.props.stopEditing();
  }

  render() {
    return (
      <div style={{background: 'white', padding: 5}}>
        <textarea rows={3} cols={40} onChange={this.handleChange} value={this.state.value}></textarea>
        <br/>
        <button onClick={this.handleOK}>OK</button>
        <button onClick={this.handleCancel}>Cancel</button>
        <span style={{float: 'right', color: "#1088bb"}}>
          <i><b>will be geocoded</b></i>
        </span>
      </div>
    );
  }

  isPopup() {
    return true;
  }

  getValue() {
    return this.state.value;
  }
}
