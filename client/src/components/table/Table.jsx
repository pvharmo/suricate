import React from 'react';
import sort from 'fast-sort';

import Row from './Row';
import EnhancedTableHead from './TableHead';

import { nextPage, changeRowsPerPage, selectAll, sortData, selectRow } from '../../redux/actions';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const styles = {};

class EnhancedTable extends React.Component {

  handleClick(id) {
    let index = this.props.module.get("selected").indexOf(id);
    let selected = [];
    if (index >= 0) {
      selected.splice(index, 1);
      selected = this.props.module.get("selected").splice(index, 1);
    } else {
      selected = this.props.module.get("selected").push(id);
    }
    let allSelected = 1;
    if (selected.size === 0) {
      allSelected = 0;
    } else if (selected.size === this.props.data.length) {
      allSelected = 2;
    }
    this.props.dispatch(selectRow({view: this.props.viewName, moduleIndex: this.props.index, selected, allSelected}));
  }

  handleChangePage(event, next) {
    if (next) {
      this.props.dispatch(nextPage({view: this.props.viewName, moduleIndex: this.props.index, page: this.props.module.get("page") + 1}));
    } else {
      this.props.dispatch(nextPage({view: this.props.viewName, moduleIndex: this.props.index, page: this.props.module.get("page") - 1}));
    }
  }

  handleChangeRowsPerPage(event) {
    this.props.dispatch(changeRowsPerPage({view: this.props.viewName, moduleIndex: this.props.index, rowsPerPage: event.target.value}));
  }

  handleSelectAllClick() {
    if (this.props.module.get("selected").length < this.props.data.length) {
      let selected = [];
      for (var i = 0; i < this.props.data.length; i++) {
        selected.push(this.props.data[i].id);
      }
      this.props.dispatch(selectAll({view: this.props.viewName, moduleIndex: this.props.index, selected, allSelected: 2}));

    } else {
      this.props.dispatch(selectAll({view: this.props.viewName, moduleIndex: this.props.index, selected: [], allSelected: 0}));
    }
  }

  handleRequestSort(event, name) {
    if (this.props.module.get("orderBy") === name) {
      if (this.props.module.get("order") === "asc") {
        this.sortData(name, "desc");
      } else {
        this.sortData(name, "asc");
      }
    } else {
      this.sortData(name, "desc");
    }
  }

  sortData(orderBy, order) {
    let data = [];
    if (order === "asc") {
      data = sort(this.props.data).asc(orderBy);
    } else if (order === "desc") {
      data = sort(this.props.data).desc(orderBy);
    }
    this.props.dispatch(sortData({view: this.props.viewName, moduleIndex: this.props.index, orderBy, order, data}));
  }

  render() {
    const { classes, module } = this.props;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              checked={module.get("allSelected")}
              order={module.get("order")}
              orderBy={module.get("orderBy")}
              onSelectAllClick={this.handleSelectAllClick.bind(this)}
              onRequestSort={this.handleRequestSort.bind(this)}
              columns={module.get("columns")}
            />
            <TableBody>
              {this.props.data.slice(module.get("page") * module.get("rowsPerPage"), (module.get("page") + 1) * module.get("rowsPerPage")).map((row)=>{
                return (
                  <Row
                    handleClick={this.handleClick.bind(this, row.id)}
                    data={row}
                    columns={module.get("columns")}
                    selected={module.get("selected").find(x => row.id === x) ? true : false}
                    key={row.id} />
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={this.props.data.length}
          rowsPerPage={module.get("rowsPerPage")}
          page={module.get("page")}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage.bind(this)}
          onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
        />
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.get("data").toJS()
})

export default connect(mapStateToProps, null)(withStyles(styles)(EnhancedTable));
