import query from 'connector';
import { put, takeEvery, all } from 'redux-saga/effects';

export function* insertRecord({payload}){
  yield query("insertRecord", payload);
  // yield query( "insertData", {values:payload.values, collection: payload.action.get("collection")});
}

export function* modifyRecord({payload}) {
  yield query("modifyRecord", {payload});
}

function* deleteRecord({payload}) {
  yield query("deleteRecord", {payload});
}

function* login({payload}) {
  yield query("login", payload);
  yield put({type: "SAVE_LOGIN"});
}

export default function* rootSaga() {
  yield all([
    takeEvery("INSERT_RECORD", insertRecord),
    takeEvery("MODIFY_RECORD", modifyRecord),
    takeEvery("DELETE_RECORD", deleteRecord),
    takeEvery("LOGIN", login)
  ]);
}
