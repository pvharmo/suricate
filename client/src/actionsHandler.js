import * as reduxActions from 'redux/actions';
import { store } from 'index.js';

const index = (action, container, view) => {
  if (action.get(container)) {
    const name = action.get(container);
    return view.get(container + "s")
      .findIndex(function (obj){return obj.get("name") === name;});
  } else {
    return undefined;
  }
};

const params = (view, action, otherParams) => {
  let dialogIndex = undefined;
  let moduleIndex = undefined;
  if (view) {
    dialogIndex = index(action, "dialog", view);
    moduleIndex = index(action, "module", view);
  }
  return {view, dialogIndex, moduleIndex, action, ...otherParams};
};

const triggerAction = (view, actions, otherParams) => {
  // console.log(otherParams);
  for (let i = 0; i < actions.size; i++) {
    const action = actions.getIn([i, "action"]);
    const parameters = params(view, actions.get(i), otherParams);
    store.dispatch(
      reduxActions[action] (parameters)
    );
  }
};

export default triggerAction;
