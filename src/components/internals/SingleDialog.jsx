import React, { useState, useEffect } from "react";
import ModulesGrid from './ModulesGrid';
import PubSub from "pubsub-js";
import PropTypes from "prop-types";

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

function SingleDialog({dialog}) {
  const [open, toggleDialog] = useState(false);

  useEffect(() => {
    let token = PubSub.subscribe("OPEN_DIALOG" + dialog.name, () => toggleDialog(true));
    
    return function cleanup() {
      PubSub.unsubscribe(token);
    };
  });

  return (
    <Dialog
      key={dialog.name}
      open={open}
      onClose={() => toggleDialog(false)}>
      <DialogTitle>{dialog.title}</DialogTitle>
      <ModulesGrid />
    </Dialog>
  );
}

SingleDialog.propTypes = {
  dialog: PropTypes.object
};

export default SingleDialog;
