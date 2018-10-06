import { fromJS, List } from 'immutable';
import * as ACTIONS from './actions';

import views from 'data/views';
import mainMenu from 'data/mainMenu';
import data from 'data/table';


const initialState = fromJS({
  views, mainMenu, data
});

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
  case ACTIONS.NEXT_PAGE:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "page"], action.payload.page);
  case ACTIONS.CHANGE_ROWS_PER_PAGE:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "rowsPerPage"], action.payload.rowsPerPage);
  case ACTIONS.SELECT_ALL:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "selected"], action.payload.selected)
      .setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "allSelected"], action.payload.allSelected);
  case ACTIONS.SORT_DATE:
    return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "order"], action.payload.order)
      .setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "orderBy"], action.payload.orderBy)
      .setIn(["data"], List(action.payload.data));
  // case ACTIONS.SELECT_ROW:
  //   return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "selected"], action.payload.selected)
  //     .setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "allSelected"], action.payload.allSelected);
  // case ACTIONS.EDIT_ROW:
  //   return state.setIn(["views", action.payload.view, "editValue"], action.payload.values);
  default:
    return state;
  }
};

export default tableReducer;
