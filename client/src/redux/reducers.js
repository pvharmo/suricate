import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

import views from 'data/views';
import mainMenu from 'data/mainMenu';
import data from 'data/table';

import query from 'connector';


const initialState = fromJS({
  views, mainMenu, data
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case CONSTANTS.SAVE_LOGIN:
  console.log("SAVE_LOGIN");
    return state;
    // return state.setIn(["user", "username"], action.payload.username).setIn(["user", "password"], action.payload.password);
  case CONSTANTS.EDIT_ITEM:
    query(action.payload.url, action.payload.collection);
    return state;
  case CONSTANTS.OPEN_DIALOG:
    return state.setIn(["views", action.payload.view.get("name"), "dialogs", action.payload.dialogIndex, "open"], true);
  case CONSTANTS.CLOSE_DIALOG:
    return state.setIn(["views", action.payload.view.get("name"), "dialogs", action.payload.dialogIndex, "open"], false);
  case CONSTANTS.INSERT_DATA:
    query( "insertData", {
      values: action.payload.values,
      collection: action.payload.action.get("collection")
    });
    return state;
  case CONSTANTS.MODIFY_DATA:
    query("modifyData", {
      values: action.payload.values,
      collection: action.payload.action.get("collection")
    });
    return state;
  case CONSTANTS.DELETE_RECORD:
    query("deleteRecord", {
      id: action.payload.values.id,
      collection: action.payload.action.get("collection")
    });
    return state;
  case CONSTANTS.SET_DEFAULT_VALUES:
    // console.log(action.payload);
    return state.updateIn(
      ["views", action.payload.view.get("name"), "defaultValues"],
      arr => arr.push({module: action.payload.action.get("module"), values: action.payload.values })
    );
  default:
    return state;
  }
};

export default rootReducer;
