import { NEXT_PAGE, CHANGE_ROWS_PER_PAGE, SELECT_ALL, SORT_DATE, SELECT_ROW, EDIT_ROW, EDIT_ITEM, OPEN_DIALOG, CLOSE_DIALOG, INSERT_DATA, MODIFY_DATA } from "./constants";

export const nextPage = payload => ({
  type: NEXT_PAGE,
  payload
});

export const changeRowsPerPage = payload => ({
  type: CHANGE_ROWS_PER_PAGE,
  payload
});

export const selectAll = payload => ({
  type: SELECT_ALL,
  payload
});

export const sortData = payload => ({
  type: SORT_DATE,
  payload
});

export const selectRow = payload => ({
  type: SELECT_ROW,
  payload
});

export const editRow = payload => ({
  type: EDIT_ROW,
  payload
});

export const editItem = payload => ({
  type: EDIT_ITEM,
  payload
});

export const openDialog = payload => ({
  type: OPEN_DIALOG,
  payload
});

export const closeDialog = payload => ({
  type: CLOSE_DIALOG,
  payload
});

export const insertData = payload => ({
  type: INSERT_DATA,
  payload
});

export const modifyData = payload => ({
  type: MODIFY_DATA,
  payload
});
