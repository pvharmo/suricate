import React, { useContext } from "react";
import SingleDialog from './SingleDialog';

import { ViewContext } from 'stores/ViewContext';

function Dialogs() {
  const view = useContext(ViewContext);

  if (view.dialogs.length > 0) {
    return (
      <div>
        {view.dialogs.map((dialog) => {
          return (
            <SingleDialog key={dialog.name} dialog={dialog} />
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
