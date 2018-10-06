import { store } from 'index.js';

export const action = (type, payload) => ({
  type, payload
});

const index = (action, container, view) => {
  const name = action.get(container);
  return view.get(container + "s")
    .findIndex(function (obj){return obj.get("name") === name;});
};

const params = (view, action, props) => {
  let dialogIndex = undefined;
  if (view && (action.get("module") || action.get("dialog"))) {
    dialogIndex = index(action, "dialog", view);
  }
  return {view, dialogIndex, action, ...props};
};

const triggerAction = (view, actions, props) => {
  for (let i = 0; i < actions.size; i++) {
    const actionType = actions.getIn([i, "action"]);
    const parameters = params(view, actions.get(i), props);
    store.dispatch(
      action(actionType, parameters)
    );
  }
};

export default triggerAction;
