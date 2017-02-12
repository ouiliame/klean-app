import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavAppBar from 'app/components/NavAppBar';

import FlatButton from 'material-ui/FlatButton';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-fresh.css';

import kleanApi from 'app/api';
import moment from 'moment';

import { DateWithInfo, NextPickup, EstGal } from './cellRenderers';
import { DateEditor, AddressEditor } from './cellEditors';

const AGDateComparator = (selectedDate, cellValue) => {
  const momentValue = moment(cellValue);
  const momentFilter = moment(selectedDate);

  if (momentValue.isBefore(momentFilter)) {
    return -1;
  }

  if (momentValue.isSame(momentFilter)) {
    return 0;
  }

  if (momentValue.isAfter(momentFilter)) {
    return 1;
  }

  return 0;
};

const identity = (x) => x;
const syncToServer = (key, transform=identity) => ({node, data, newValue}) => {
  kleanApi.post(`/clients/edit/${data.id}`, {[key]: transform(newValue)}).then((res) => {
    node.setData(res.data)
  });
};

class ClientsIndex extends Component {

  getGridOptions() {
    return {
      context: {
        getNextDate: function(lastPickup, frequency) {
          if (lastPickup && frequency) {
            return moment(lastPickup).add(Number(frequency), 'days').toDate();
          }
        },

        getEst: function(lastPickup, frequency, now) {
          if (lastPickup && frequency) {
            const goal = moment.duration(Number(frequency), 'days');
            const start = moment(lastPickup);
            const progress = moment.duration(now.diff(start));
            return (progress.asSeconds() / goal.asSeconds()).toFixed(2);
          }
        },

        now: moment()
      },
      rowHeight: 30,
      columnDefs: [
        {headerName: 'ID', field: 'id', width: 80, sort: 'asc', cellStyle: {'text-align': 'center'}},
        {
          headerName: 'Contact',
          children: [
            {
              headerName: 'Name',
              field: 'name',
              width: 175,
              editable: true,
              onCellValueChanged: syncToServer('name')
            },
            {headerName: 'Tel.', field: 'telephone', width: 110, columnGroupShow: 'open'},
            {headerName: 'Notes', field: 'contactInfo', width: 200, columnGroupShow: 'open'},
          ]
        },
        {
          headerName: "Address",
          children: [
            {
              headerName: "Street",
              field: "street",
              width: 200,
              filter: 'text',
              editable: true,
              cellEditorFramework: AddressEditor,
              onCellValueChanged: syncToServer('address')
            },
            {headerName: "City", field: "city", width: 100, filter: 'text'},
            {headerName: "County", field: "county", width: 150, filter: 'text', columnGroupShow: 'open'},
            {headerName: "State", field: "state", width: 75, filter: 'text', cellStyle: {'text-align': 'center'}, columnGroupShow: 'open'},
            {headerName: "ZIP", field: "zip", width: 75, filter: 'text',cellStyle: {'text-align': 'center'}, columnGroupShow: 'open'}
          ]
        },

        {
          headerName: "Pickups",
          children: [
            {
              headerName: 'Freq.',
              field: 'frequency',
              width: 75,
              editable: true,
              cellEditor: 'select',
              cellEditorParams: { values: ['', '7', '14', '21', '30', '45', '60']},
              columnGroupShow: 'open',
              cellStyle: {'text-align': 'center'},
              filter: 'number',
              onCellValueChanged: syncToServer('frequency')
            },
            {
              headerName: 'Last',
              field: 'lastPickup',
              filter: 'date',
              filterParams: { comparator: AGDateComparator },
              width: 100,
              editable: true,
              cellEditorFramework: DateEditor,
              columnGroupShow: 'open',
              cellStyle: {'text-align': 'center'},
              cellRendererFramework: DateWithInfo,
              onCellValueChanged: syncToServer('lastPickup')
            },
            {headerName: 'Next*', headerTooltip: "Projected next pickup date by Last P/O + Freq.", cellStyle: {'text-align': 'center'}, valueGetter: 'ctx.getNextDate(data.lastPickup, data.frequency)', cellRendererFramework: NextPickup, filter: 'date', width: 100}
          ]
        },

        {
          headerName: "Container",
          children: [
            {headerName: '%, gal*', volatile: true, headerTooltip: "Estimated % cap, + gal by linear approx.", valueGetter: 'ctx.getEst(data.lastPickup, data.frequency, ctx.now)', cellRendererFramework: EstGal, filter: 'number', width: 100},
            {
              headerName: 'Size',
              field: 'containerSize',
              editable: true,
              filter: 'number',
              width: 75,
              editable: true,
              onCellValueChanged: syncToServer('containerSize')
            }
          ]
        },

      ],

      suppressMovableColumns: true,
      enableFilter: true,
      enableSorting: true,
      enableColResize: true

      // TODO: Create correct data source
      // rowModelType: 'virtual',

    }
  }

  onGridReady = (params) => {
    this.api = params.api;
    this.columnApi = params.columnApi;

    kleanApi.get('clients/all').then((res) => {
      this.api.setRowData(res.data);
    });
  }

  newClient = () => {

  }

  render() {

    return (
      <div className="view" style={{ display: 'table', position: 'absolute', width: '100%', height: '100%' }}>
        <div style={{ display: 'table-row', height: 64 }}>
          <NavAppBar title="Clients - Index" iconElementRight={<FlatButton label="New Client" onTouchTap={this.newClient}/>} />
        </div>
        <div className="ag-fresh" style={{ display: 'table-row', height: '100%' }}>
          <AgGridReact onGridReady={this.onGridReady} gridOptions={this.getGridOptions()} />
        </div>
      </div>
    );
  }
};

const s2p = (s, oP) => ({
  model: oP.params.resource
});

const d2p = {};

export default connect(s2p, d2p)(ClientsIndex);
