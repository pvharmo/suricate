import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
// import Form from '../form/Form'
// import Table from '../table/Table'
import MuiTable from 'modules/MuiTable/MuiTable';
import FormGenerator from 'modules/form/FormGenerator';
import { connect } from "react-redux";
import actionsHandler from 'redux/actions';
import { fromJS } from 'immutable';

import Nav from 'components/nav/Nav';
import TopBar from 'components/TopBar';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const drawerWidth = 230;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  container: {
    marginLeft: drawerWidth + 16,
    marginRight: 16,
    marginTop: 21 + 70
  }
});

class MainContainer extends React.Component {

  shouldComponentUpdate(nextProps) {
    let dialogs = nextProps.view.get("dialogs");
    for (var i = 0; i < dialogs.size; i++) {
      if (dialogs.getIn([i,"open"]) !== this.props.view.getIn(["dialogs", i , "open"])) {
        return true;
      }
    }
    return false;
  }

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
      return <MuiTable viewName={this.props.viewName} view={this.props.view} index={index} module={module} />;
    default:
      return <p>Type de module non reconnu</p>;
    }
  }

  handleAction(view, action) {
    actionsHandler(action, null, view);
  }

  render() {
    const { classes, mainMenu, view, modules } = this.props;

    return (

      <div className={classes.root}>
        <TopBar />
        <Nav menu={mainMenu.toJS()} />
        <div className={classes.container} >
          <Grid container spacing={24}>
            {view.get("modules").map((moduleName, index)=>{
              const module = modules.find(x => x.get("name") === moduleName);
              return (
                <Grid item key={module.get("name")} xs={12} >
                  {this.module(module, index)}
                </Grid>
              );
            })}
          </Grid>
          {view.get("dialogs").map((dialog)=>{
            return (
              <Dialog
                key={dialog.get("name")}
                open={dialog.get("open")}
                onClose={this.handleAction.bind(this, view, fromJS([{action: "CLOSE_DIALOG", dialog: dialog.get("name")}]))}>
                <DialogTitle>{dialog.get("title")}</DialogTitle>
                {dialog.get("modules").map((moduleName, moduleIndex)=>{
                  const module = modules.find(x => x.get("name") === moduleName);
                  return (
                    <Grid item key={module.get("name")}>
                      {this.module(module, moduleIndex)}
                    </Grid>
                  );
                })}
              </Dialog>
            );
          })}
          {view.get("actionButton") &&
            <Button
              onClick={this.handleAction.bind(this, view, view.get("actionButton")) }
              variant="fab"
              className={classes.fab}
              color="primary">
              <AddIcon />
            </Button>
          }
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  view: ImmutablePropTypes.map,
  viewName: PropTypes.string,
  classes: PropTypes.object,
  mainMenu: ImmutablePropTypes.list,
  modules: ImmutablePropTypes.list
};

const mapStateToProps = (state) => {
  let location = state.getIn(["router", "location", "pathname"]).substr(1);
  if (location === "") {
    location = state.getIn(["views", "main"]);
  }
  return {
    data: state.get("data").toJS(),
    mainMenu: state.get("mainMenu"),
    view: state.getIn(["views", location]),
    modules: state.get("modules")
  };
};

export default connect(mapStateToProps, null)(withStyles(styles)(MainContainer));
