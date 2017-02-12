import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import BackAppBar from 'app/components/BackAppBar';
import muiThemable from 'material-ui/styles/muiThemeable';

import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';

import LaunchIcon from 'material-ui/svg-icons/action/launch';
import InfoIcon from 'material-ui/svg-icons/action/info';
import FleetIcon from 'material-ui/svg-icons/maps/local-shipping';
import JobsIcon from 'material-ui/svg-icons/action/list';
import UpdateIcon from 'material-ui/svg-icons/action/update';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';

function sectionToStep(section) {
  switch(section) {
    case 'info':
    return 0;
    case 'fleet':
    return 1;
    case 'jobs':
    return 2;
    case 'optimize':
    return 3;
    default:
    return 0;
  }
}

class EditView extends Component {

  goToSection = (section) => {
    const { params: { id } , replace } = this.props;
    replace('/route66/edit/' + id + '/' + section);
  }

  getColor = (n) => {
    const { muiTheme: { palette } } = this.props;
    const { primary1Color, disabledColor } = palette;
    return this.props.step === n ? primary1Color : disabledColor;
  }

  render() {

    const { step, replace } = this.props;

    return (
      <div className="view">
        <BackAppBar title="Route Optimizer" iconElementRight={<FlatButton label="Optimize"/>} />
        <Stepper
          activeStep={step}
          linear={false}
          orientation="vertical">
          <Step>
            <StepButton onTouchTap={() => this.goToSection('info')} icon={<InfoIcon color={this.getColor(0)}/>} >
              General information
            </StepButton>
            <StepContent>
              <TextField floatingLabelText="Project Title"/>
              <DatePicker floatingLabelText="Date" />
              <FlatButton label="Today" /> <FlatButton label="TMRW" /> <FlatButton secondary label="CLEAR" />
            </StepContent>
          </Step>

          <Step>
            <StepButton onTouchTap={() => this.goToSection('fleet')} icon={<FleetIcon color={this.getColor(1)} />} >
              Define fleet abilities and capacities
            </StepButton>
            <StepContent>
              <Table multiSelectable>
                <TableHeader enableSelectAll>
                  <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>FO</TableHeaderColumn>
                    <TableHeaderColumn>HC</TableHeaderColumn>
                    <TableHeaderColumn>GT</TableHeaderColumn>
                    <TableHeaderColumn>HJ</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableRowColumn>VH #1</TableRowColumn>
                    <TableRowColumn>1200</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                    <TableRowColumn>0</TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </StepContent>
          </Step>

          <Step>
            <StepButton onTouchTap={() => this.goToSection('jobs')} icon={<JobsIcon color={this.getColor(2)} />} >
              Specify jobs and constraints
            </StepButton>
            <StepContent>
              <p>
                No jobs have been added.
              </p>
              <RaisedButton primary icon={<LaunchIcon />} label="Launch jobs editor" />
            </StepContent>
          </Step>

          <Step>
            <StepButton onTouchTap={() => this.goToSection('optimize')} icon={<UpdateIcon color={this.getColor(3)} />} >
              Run optimizer and review results
            </StepButton>
            <StepContent>
              <p>
                Routes have not yet been generated.
              </p>
              <RaisedButton primary icon={<PlayIcon />} label="Run optimizer" />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
};

export default connect((s, oP) => ({
  step: sectionToStep(oP.params.section)
}), { replace } )( muiThemable()(EditView) );
