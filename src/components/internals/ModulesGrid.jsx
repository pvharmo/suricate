
import React, {useContext} from 'react';
import modules from 'data/modules';
import { ViewContext } from 'stores/ViewContext';

import ModuleSwitch from './ModuleSwitch';

import Grid from '@material-ui/core/Grid';

function ModulesGrid() {
  const view = useContext(ViewContext);
  return (
    <Grid container spacing={24}>
      {view.modules.map((moduleName, index) => {
        const module = modules.find(x => x.name === moduleName);
        return (
          <Grid item key={module.name} xs={12} >
            <ModuleSwitch module={module} index={index} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ModulesGrid;