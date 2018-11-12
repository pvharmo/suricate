import query from 'connectors/connector';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import storage from 'store';

function* insertRecord({payload}){
  let values = payload.values;
  let collection = payload.action.get("collection");
  yield query("insertRecord", {values, collection});
  // yield query( "insertData", {values:payload.values, collection: payload.action.get("collection")});
}

function* modifyRecord({payload}) {
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
  yield storage.set("user", auth);
  yield put(push("/"));
}

function* goToLogin() {
  yield put(push("/login"));
}

function* goHome() {
  yield put(push("/"));
}

export default function* rootSaga() {
  yield all([
    takeEvery("INSERT_RECORD", insertRecord),
    takeEvery("MODIFY_RECORD", modifyRecord),
    takeEvery("DELETE_RECORD", deleteRecord),
    takeEvery("LOGIN", login),
    takeEvery("GO_TO_LOGIN", goToLogin),
    takeEvery("GO_HOME", goHome)
  ]);
}

export function* reHydrate() {
  let auth = {};
  yield auth = storage.get("user");
  yield put({type: "SAVE_LOGIN", payload:{auth}});
}
