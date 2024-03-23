import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Refer: https://www.npmjs.com/package/redux-persist
const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//follow this guide => https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
  //reducer: { user: userReducer },
  reducer: persistedReducer, //this is done after the redux-persist implementation
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, //to avoid any error in the brwser
    });
  },
});

export const persistor = persistStore(store);
