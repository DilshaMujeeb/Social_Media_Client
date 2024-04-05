import { combineReducers } from "redux";
import authReducer from "./AuthReducer"; // Import your auth reducer
import { postReducer } from "./postReducer";
export const reducers = combineReducers({authReducer,postReducer})
