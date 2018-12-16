import React, { useContext } from 'react';
import ModulesGrid from './ModulesGrid';

import { ViewContext } from 'stores/ViewContext';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

function handleAction(view, action) {
  // actionsHandler(action, null, view);
}

function Dialogs() {
  const view = useContext(ViewContext);
  if (view.dialogs.length > 0) {
    return (
      <div>
        {view.dialogs.map((dialog) => {
          return (
            <Dialog
              key={dialog.name}
              open={dialog.open}
              onClose={handleAction.bind(this, view, [{ action: "CLOSE_DIALOG", dialog: dialog.name }])}>
              <DialogTitle>{dialog.title}</DialogTitle>
              <ModulesGrid />
              {/* dialog.modules.map((moduleName, index) => {
                const module = modules.find(x => x.name === moduleName);
                return (
                  <Grid item key={module.name}>
                    <ModuleSwitch module={module} index={index} />
                  </Grid>
                );
              }) */}
            </Dialog>
          );
        })}
      </div>
    );
  }
  else {
    return <div></div>;
  }
}

export default Dialogs;