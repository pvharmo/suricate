import React from 'react';
import sort from 'fast-sort';

import Row from './Row';
import EnhancedTableHead from './TableHead';

import data from '../../data/table';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

const styles = {};

class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: 'price',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    allSelected: 0
  };

  handleClick(id) {
    let index = this.state.selected.indexOf(id);
    let selected = this.state.selected;
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    let allSelected = 1;
    if (selected.length === 0) {
      allSelected = 0;
    } else if (selected.length === data.length) {
      console.log("test");
      allSelected = 2;
    }
    this.setState({selected, allSelected});
  }

  handleChangePage(event, next) {
    if (next) {
      this.setState({page: this.state.page + 1})
    } else {
      this.setState({page: this.state.page - 1})
    }
  }

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
  }

  handleSelectAllClick() {
    if (this.state.selected.length < data.length) {
      let selected = [];
      for (var i = 0; i < data.length; i++) {
        selected.push(data[i].id);
      }
      this.setState({selected, allSelected: 2});

    } else {
      this.setState({selected: [], allSelected: 0})
    }
  }

  handleRequestSort(event, name) {
    if (this.state.orderBy === name) {
      if (this.state.order === "asc") {
        this.sortData(name, "desc");
      } else {
        this.sortData(name, "asc");
      }
    } else {
      this.sortData(name, "desc");
    }
  }

  sortData(orderBy, order) {
    if (order === "asc") {
      sort(data).asc(orderBy);
    } else if (order === "desc") {
      sort(data).desc(orderBy);
    }
    this.setState({orderBy, order});
  }

  render() {
    const { classes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page, allSelected } = this.state;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              checked={allSelected}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick.bind(this)}
              onRequestSort={this.handleRequestSort.bind(this)}
              columns={this.props.columns}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row)=>{
                return (
                  <Row
                    handleClick={this.handleClick.bind(this, row.id)}
                    data={row}
                    columns={this.props.columns}
                    selected={selected.find(x => row.id === x) ? true : false}
                    key={row.id} />
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
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

export default withStyles(styles)(EnhancedTable);
