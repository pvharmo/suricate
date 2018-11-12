import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';


const styles = {};

class Row extends React.Component {
  render() {
    return (
      <TableRow
        hover
        onClick={this.props.handleClick.bind(this, this.props.row)}
        selected={this.props.selected}
      >
      <TableCell padding="checkbox">
        <Checkbox checked={this.props.selected} />
      </TableCell>
      {
        this.props.columns.map((column)=>{
          return (
            <TableCell padding="checkbox" key={column.get("name")}>
              {this.props.data[column.get("name")]}
            </TableCell>
          );
        })
      }
      </TableRow>
    );
  }
}

export default withStyles(styles)(Row);
