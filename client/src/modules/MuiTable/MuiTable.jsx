import React from 'react';
import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import { connect } from "react-redux";
import query from 'connectors/connector';
import actionsHandler from 'redux/actions';
import ImmutablePropTypes from 'react-immutable-proptypes';


import db from 'db';

import 'dexie-observable' ;

const styles = {};

class MuiTable extends React.Component {
  constructor(props) {
    super(props);

    query("getData", {url: props.module.get("httpServer") + props.module.get("collection"), collection: props.module.get("collection")});

    this.data();

    db.on('changes', () => {
      this.data();
    });

    this.state = {
      dbUpdate: 0
    };
  }

  columns(){
    let columns = this.props.module.get("columns").toJS().slice();
    let customBodyRender = (id, tableMeta)=>(<IconButton index={tableMeta.columnIndex} onClick={this.edit.bind(this, id)} ><Edit/></IconButton>);
    let idField = {name: "id", label: {name: "Éditer", options: {filter: false, customBodyRender}}};
    columns.push(idField);
    return columns;
  }

  async data() {
    const result = await db[this.props.module.get("collection")].toArray();
    this.setState({data: result});
  }

  async edit(id) {
    let data = await db.books.where({id}).toArray();
    actionsHandler(this.props.view, this.props.module.get("onClickRow"), {values: data[0]});
    // this.props.actions.editRow({view: this.props.viewName, moduleIndex: this.props.index, values:data});
  }

  datatable (columns, data) {
    let datatable = {columns: [], data: []};
    if (data) {
      for (let i = 0; i < columns.length; i++) {
        datatable.columns.push(columns[i].label);
      }
      for (let i = 0; i < data.length; i++) {
        let row = [];
        for (let j = 0; j < columns.length; j++) {
          row.push(data[i][columns[j].name]);
        }
        datatable.data.push(row);
      }
    } else {
      datatable = {columns: [""], data: [[""]]};
    }
    return datatable;
  }

  render() {
    const datatable = this.datatable(this.columns(), this.state.data);
    // let updateDb = this.state.updateDb;
    return (
      <MUIDataTable
        id={"table-"+this.state.updateDb}
        title={this.props.module.get("name")}
        data={datatable.data}
        columns={datatable.columns}
        options={this.props.module.get("options").toJS()}
      />
    );
  }
}

MuiTable.propTypes ={
  view: ImmutablePropTypes.map,
  module: ImmutablePropTypes.map
};

const mapStateToProps = (state) => ({
  data: state.get("data").toJS()
});

export default connect(mapStateToProps, null)(withStyles(styles)(MuiTable));
