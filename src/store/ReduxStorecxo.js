import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducers } from "../Reducer";
import { thunk } from "redux-thunk";

// Middleware to access actions
const middleware = getDefaultMiddleware({
  thunk: true, // Include thunk middleware
  serializableCheck: false, // Disable serializableCheck middleware for Redux persist compatibility
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware, // Add middleware to the store configuration
});

const persistore = persistStore(store);

export default store
