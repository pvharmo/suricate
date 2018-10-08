import query from 'connector';
import { put, call, takeEvery, all } from 'redux-saga/effects';

export function* insertRecord({payload}){
  let values = payload.values;
  let collection = payload.action.get("collection");
  yield query("insertRecord", {values, collection});
  // yield query( "insertData", {values:payload.values, collection: payload.action.get("collection")});
}

export function* modifyRecord({payload}) {
  let values = payload.values;
  let collection = payload.action.get("collection");
  yield query("modifyRecord", {values, collection});
}

function* deleteRecord({payload}) {
  let values = payload.values;
  let collection = payload.action.get("collection");
  yield query("deleteRecord", {values, collection});
}

function* login({payload}) {
  // let username = payload.username;
  // let password = payload.password;
  const auth = yield call(query, "login");
  yield put({type: "SAVE_LOGIN", payload:{auth, ...payload}});
}

export default function* rootSaga() {
  yield all([
    takeEvery("INSERT_RECORD", insertRecord),
    takeEvery("MODIFY_RECORD", modifyRecord),
    takeEvery("DELETE_RECORD", deleteRecord),
    takeEvery("LOGIN", login)
  ]);
}
