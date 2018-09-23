import React from 'react';
import MUIDataTable from "mui-datatables";
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';

const styles = {};

class MuiTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = this.props.columns.push(
      {nom: "id", label: {name: "Éditer", options: {filter: false, customBodyRender: (value, tableMeta)=>{
        return (<IconButton index={tableMeta.columnIndex} onClick={this.selectionnerDepannage.bind(this,value)}><Edit/></IconButton>);
      }}}}
    );
  }

  datatable (colonnes, donnees) {
    let datatable = {colonnes: [], donnees: []};
    if (donnees) {
      for (let i = 0; i < colonnes.length; i++) {
        datatable.colonnes.push(colonnes[i].label);
      }
      for (let i = 0; i < donnees.length; i++) {
        let row = [];
        for (let j = 0; j < colonnes.length; j++) {
          row.push(donnees[i][colonnes[j].nom]);
        }
        datatable.donnees.push(row);
      }
    } else {
      datatable = {colonnes: [""], donnees: [[""]]};
    }
    return datatable;
  }

  render() {
    const options = {}
    const datatable = this.datatable(this.colonnes, this.state.depannages);
    return (
      <MUIDataTable
        title={this.props.name}
        data={this.props.data}
        columns={this.columns}
        options={options}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.get("data").toJS()
})

export default connect(mapStateToProps, null)(withStyles(styles)(MuiTable));
