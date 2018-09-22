import React from 'react';
import Form from '../form/Form';
import Table from '../table/Table';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});


/**
 * this is View class.
 */
class View extends React.Component {

  module(module, index) {
    switch (module.get("type")) {
    case "form":
      return (
        <Card>
          <CardContent>
            <Form index={index} fields={module.get("fields")} data={module.get("data")} />
          </CardContent>
        </Card>
      );
    case "table":
      return <Table viewName={this.props.viewName} index={index} module={module} />;
    default:
      return <p>Type de module non reconnu</p>;
    }
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
      </div>
    );
  }
}

export default withStyles(styles)(View);
