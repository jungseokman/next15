import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_BOOKS_REQUEST,
  fetchBooksFailure,
  fetchBooksSuccess,
} from "../actions/bookActions";

function* fetchBooksSaga(): Generator<any, void, BookData[]> {
  try {
    const books = yield call(fetchBooks);
    yield put(fetchBooksSuccess(books));
  } catch (error) {
    yield put(fetchBooksFailure((error as Error).message));
  }
}

export default function* bookSaga() {
  yield takeLatest(FETCH_BOOKS_REQUEST, fetchBooksSaga);
}
