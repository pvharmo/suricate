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

  module(module) {
    switch (module.type) {
    case "form":
      return (
        <Card>
          <CardContent>
            <Form fields={module.fields} data={module.data} />
          </CardContent>
        </Card>
      );
    case "table":
      return <Table columns={module.columns} />;
    default:
      return <p>Type de module non reconnu</p>;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {this.props.view.modules.map((module)=>{
            return (
              <Grid item key={module.name}>
                {this.module(module)}
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(View);
