import { combineReducers } from "redux";
import authReducer from "./AuthReducer"; // Import your auth reducer
import { postReducer } from "./postReducer";
import uploadReducer from "./uploadReducer";
export const reducers = combineReducers({
  authReducer,
  postReducer,
  uploadReducer,
});
