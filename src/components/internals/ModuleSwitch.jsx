import React from 'react';
import FormGenerator from 'modules/form/FormGenerator';
// import MuiTable from 'modules/MuiTable/MuiTable';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function ModuleSwitch(props) {
  const { module, index, view, viewName } = props;
  switch (module.type) {
  case "form":
    return (
      <Card>
        <CardContent>
          <FormGenerator index={index} module={module} />
        </CardContent>
      </Card>
    );
  // case "table":
  //   return <MuiTable viewName={viewName} view={view} index={index} module={module} />;
  default:
    return <p>Type de module non reconnu</p>;
  }
}

export default withStyles({})(ModuleSwitch);