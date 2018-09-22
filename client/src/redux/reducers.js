import { fromJS, List } from 'immutable';
import { GET_VIEWS, GET_MAINMENU, NEXT_PAGE, CHANGE_ROWS_PER_PAGE, SELECT_ALL, SORT_DATE, SELECT_ROW } from './constants';

import views from '../data/views';
import mainMenu from '../data/mainMenu';
import data from '../data/table';


const initialState = fromJS({
  views, mainMenu, data
});

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIEWS:
      console.log("get_views");
      break;
    case GET_MAINMENU:
      return state.get('mainMenu');
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
      // console.log(action.payload.selected.toJS());
      return state.setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "selected"], action.payload.selected)
      .setIn(["views", action.payload.view, "modules", action.payload.moduleIndex, "allSelected"], action.payload.allSelected);
    default:
      return state;
  }
};

export default rootReducer;
