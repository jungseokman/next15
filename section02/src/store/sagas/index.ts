import { all } from "redux-saga/effects";
import bookSaga from "./bookSaga";

export default function* rootSaga() {
  yield all([
    bookSaga(),
    // 다른 사가 추가 가능
  ]);
}
