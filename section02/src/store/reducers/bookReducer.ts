import {
  BookActionTypes,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
} from "../actions/bookActions";
import { BookState } from "../types";

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

const bookReducer = (
  state = initialState,
  action: BookActionTypes
): BookState => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.payload };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bookReducer;
