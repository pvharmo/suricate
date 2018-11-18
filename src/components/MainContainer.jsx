import React from 'react';
import PropTypes from 'prop-types';
// import MuiTable from 'modules/MuiTable/MuiTable';
import FormGenerator from 'modules/form/FormGenerator';

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


function module(props) {
  const { module, index, view, viewName } = props;
  switch (module.get("type")) {
  case "form":
    return (
      <Card>
        <CardContent>
          <FormGenerator index={index} view={view} module={module} fields={module.get("fields")} data={view.get("editValue")} />
        </CardContent>
      </Card>
    );
  // case "table":
  //   return <MuiTable viewName={viewName} view={view} index={index} module={module} />;
  default:
    return <p>Type de module non reconnu</p>;
  }
}

function handleAction(view, action) {
  // actionsHandler(action, null, view);
}

function MainContainer(props) {
  const { classes, mainMenu, view, modules } = props;

  return (

    <div className={classes.root}>
      <TopBar />
      <Nav menu={mainMenu.toJS()} />
      <div className={classes.container} >
        <Grid container spacing={24}>
          {view.get("modules").map((moduleName, index) => {
            const module = modules.find(x => x.get("name") === moduleName);
            return (
              <Grid item key={module.get("name")} xs={12} >
                {module(module, index)}
              </Grid>
            );
          })}
        </Grid>
        {view.get("dialogs").map((dialog) => {
          return (
            <Dialog
              key={dialog.get("name")}
              open={dialog.get("open")}
              onClose={handleAction.bind(this, view, [{ action: "CLOSE_DIALOG", dialog: dialog.get("name") }])}>
              <DialogTitle>{dialog.get("title")}</DialogTitle>
              {dialog.get("modules").map((moduleName, moduleIndex) => {
                const module = modules.find(x => x.get("name") === moduleName);
                return (
                  <Grid item key={module.get("name")}>
                    {module(module, moduleIndex)}
                  </Grid>
                );
              })}
            </Dialog>
          );
        })}
        {view.get("actionButton") &&
          <Button
            onClick={handleAction.bind(this, view, view.get("actionButton"))}
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

MainContainer.propTypes = {
  view: PropTypes.object,
  viewName: PropTypes.string,
  classes: PropTypes.object,
  mainMenu: PropTypes.array,
  modules: PropTypes.array
};

export default withStyles(styles)(MainContainer);
