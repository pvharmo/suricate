import React from 'react';
import PropTypes from 'prop-types';
import FormGenerator from 'modules/form/FormGenerator';

import bg from 'bg.jpg';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh"
  },
  container: {
    height: "100%",
    background: "url(" + bg + ")",
    backgroundPosition: "center"
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

function module(module, index) {
  switch (module.get("type")) {
  case "form":
    return (
      <FormGenerator index={index} view={this.props.view} module={module} fields={module.get("fields")} data={this.props.view.get("editValue")} />
    );
  default:
    return <p>Type de module non reconnu</p>;
  }
}

function Login(props) {
  const { classes, modules, view } = props;

  return (
    <div className={classes.root}>
      <Grid container className={classes.container} justify="center" alignItems="center" >
        <Grid item xs={10} sm={6} md={3} xl={2} >
          <Card>
            <CardContent>
              <Grid container spacing={24}>
                {view.get("modules").map((moduleName, index) => {
                  const module = modules.find({ value: moduleName, key: "name" });
                  return (
                    <Grid item key={module.get("name")} xs={12} >
                      {module(module, index)}
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

Login.propTypes = {
  view: PropTypes.object,
  viewName: PropTypes.string,
  classes: PropTypes.object,
  modules: PropTypes.array
};

export default withStyles(styles)(Login);
