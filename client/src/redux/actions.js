import { GET_VIEWS, GET_MAINMENU, NEXT_PAGE, CHANGE_ROWS_PER_PAGE, SELECT_ALL, SORT_DATE, SELECT_ROW } from "./constants";

export const getViews = payload => ({
  type: GET_VIEWS,
  payload
})

export const getMainMenu = payload => ({
  type: GET_MAINMENU,
  payload
})

export const nextPage = payload => ({
  type: NEXT_PAGE,
  payload
})

export const changeRowsPerPage = payload => ({
  type: CHANGE_ROWS_PER_PAGE,
  payload
})

export const selectAll = payload => ({
  type: SELECT_ALL,
  payload
})

export const sortData = payload => ({
  type: SORT_DATE,
  payload
})

export const selectRow = payload => ({
  type: SELECT_ROW,
  payload
})
