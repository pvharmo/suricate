import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

import views from 'data/views';
import mainMenu from 'data/mainMenu';
import data from 'data/table';

import query from 'connectors/connector';


const initialState = fromJS({
  views, mainMenu, data, user: {}
});

const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
  case CONSTANTS.SAVE_LOGIN:
    return state.set("user", payload.auth);
  case CONSTANTS.EDIT_ITEM:
    query(payload.url, payload.collection);
    return state;
  case CONSTANTS.OPEN_DIALOG:
    return state.setIn(["views", payload.view.get("name"), "dialogs", payload.dialogIndex, "open"], true);
  case CONSTANTS.CLOSE_DIALOG:
    return state.setIn(["views", payload.view.get("name"), "dialogs", payload.dialogIndex, "open"], false);
  case CONSTANTS.SET_DEFAULT_VALUES:
    return state.updateIn(
      ["views", payload.view.get("name"), "defaultValues"],
      arr => arr.push({module: payload.action.get("module"), values: payload.values })
    );
  default:
    return state;
  }
};

export default rootReducer;
