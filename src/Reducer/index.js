import { combineReducers } from "redux";
import authReducer from "./AuthReducer"; // Import your auth reducer
import { postReducer } from "./postReducer";
import imageUploadReducer from "./ImageUploadReducer"
export const reducers = combineReducers({
  authReducer,
  postReducer,
  imageUploadReducer,
});
