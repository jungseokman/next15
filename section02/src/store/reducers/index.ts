import { combineReducers } from "@reduxjs/toolkit";
import bookReducer from "./bookReducer";

const rootReducer = combineReducers({
  book: bookReducer,
});

export default rootReducer;
