import { BookData } from "@/types";

export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";

export interface FetchBooksRequestAction {
  type: typeof FETCH_BOOKS_REQUEST;
}

export interface FetchBooksSuccessAction {
  type: typeof FETCH_BOOKS_SUCCESS;
  payload: BookData[];
}

export interface FetchBooksFailureAction {
  type: typeof FETCH_BOOKS_FAILURE;
  payload: string;
}

export type BookActionTypes =
  | FetchBooksRequestAction
  | FetchBooksSuccessAction
  | FetchBooksFailureAction;

export const fetchBooksRequest = (): FetchBooksRequestAction => ({
  type: FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = (
  books: BookData[]
): FetchBooksSuccessAction => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = (error: string): FetchBooksFailureAction => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error,
});
