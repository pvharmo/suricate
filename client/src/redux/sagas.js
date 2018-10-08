import query from 'connectors/connector';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

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
  let username = payload.values.username;
  let password = payload.values.password;
  const auth = yield call(query, "login", {username, password});
  yield put({type: "SAVE_LOGIN", payload:{auth, ...payload}});
  yield put(push('/'));
}

export default function* rootSaga() {
  yield all([
    takeEvery("INSERT_RECORD", insertRecord),
    takeEvery("MODIFY_RECORD", modifyRecord),
    takeEvery("DELETE_RECORD", deleteRecord),
    takeEvery("LOGIN", login)
  ]);
}
