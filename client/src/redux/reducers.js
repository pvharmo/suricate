import { fromJS, List } from 'immutable';
import { NEXT_PAGE, CHANGE_ROWS_PER_PAGE, SELECT_ALL, SORT_DATE, SELECT_ROW, EDIT_ROW, EDIT_ITEM, OPEN_DIALOG, CLOSE_DIALOG, INSERT_DATA, MODIFY_DATA } from './constants';

import views from 'data/views';
import mainMenu from 'data/mainMenu';
import data from 'data/table';

import query from 'connector';


const initialState = fromJS({
  views, mainMenu, data
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case NEXT_PAGE:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "page"], action.payload.page);
  case CHANGE_ROWS_PER_PAGE:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "rowsPerPage"], action.payload.rowsPerPage);
  case SELECT_ALL:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "selected"], action.payload.selected)
      .setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "allSelected"], action.payload.allSelected);
  case SORT_DATE:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "order"], action.payload.order)
      .setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "orderBy"], action.payload.orderBy)
      .setIn(["data"], List(action.payload.data));
  case SELECT_ROW:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "selected"], action.payload.selected)
      .setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "allSelected"], action.payload.allSelected);
  case EDIT_ROW:
    return state.setIn(["views", action.payload.view, "editValue"], action.payload.values);
  case EDIT_ITEM:
    query(action.payload.url, action.payload.collection);
    break;
  case OPEN_DIALOG:
    return state.setIn(["views", action.payload.view.get("name"), "dialogs", action.payload.dialogIndex, "open"], true);
  case CLOSE_DIALOG:
    return state.setIn(["views", action.payload.view.get("name"), "dialogs", action.payload.dialogIndex, "open"], false);
  case INSERT_DATA:
    query( "insertData", {
      values: action.payload.values,
      collection: action.payload.action.get("collection"),
      httpServer: action.payload.action.get("httpServer")
    });
    break;
  case MODIFY_DATA:
    break;
  default:
    return state;
  }
};

export default rootReducer;
