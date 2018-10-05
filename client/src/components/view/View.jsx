import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
// import Form from '../form/Form'
// import Table from '../table/Table'
import MuiTable from 'components/table/MuiTable';
import FormGenerator from 'components/form/FormGenerator';
import { connect } from "react-redux";
import actionsHandler from 'actionsHandler';
import { fromJS } from 'immutable';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

class View extends React.Component {

  module(module, index) {
    switch (module.get("type")) {
    case "form":
      return (
        <Card>
          <CardContent>
            <FormGenerator index={index} view={this.props.view} module={module} fields={module.get("fields")} data={this.props.view.get("editValue")} />
          </CardContent>
        </Card>
      );
    case "table":
      return <MuiTable viewName={this.props.viewName} index={index} module={module} />;
    default:
      return <p>Type de module non reconnu</p>;
    }
  }

  handleAction(view, action) {
    actionsHandler(view, action);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {this.props.view.get("modules").map((module, index)=>{
            return (
              <Grid item key={module.get("name")}>
                {this.module(module, index)}
              </Grid>
            );
          })}
        </Grid>
        {this.props.view.get("dialogs").map((dialog)=>{
          return (
            <Dialog
              key={dialog.get("name")}
              open={dialog.get("open")}
              onClose={this.handleAction.bind(this, this.props.view, fromJS([{action: "closeDialog", dialog: dialog.get("name")}]))}>
              <DialogTitle>{dialog.get("title")}</DialogTitle>
              {dialog.get("modules").map((module, moduleIndex)=>{
                return (
                  <Grid item key={module.get("name")}>
                    {this.module(module, moduleIndex)}
                  </Grid>
                );
              })}
            </Dialog>
          );
        })}
        {this.props.view.get("actionButton") &&
          <Button
            onClick={this.handleAction.bind(this, this.props.view, this.props.view.get("actionButton")) }
            variant="fab"
            className={classes.fab}
            color="primary">
            <AddIcon />
          </Button>
        }
      </div>
    );
  }
}

View.propTypes = {
  view: ImmutablePropTypes.map,
  viewName: PropTypes.string,
  classes: PropTypes.object
};

const mapStateToProps = (state) => ({
  data: state.get("data").toJS()
});

export default connect(mapStateToProps, null)(withStyles(styles)(View));
