import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/userSlice";

//follow this guide => https://redux-toolkit.js.org/tutorials/quick-start
export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, //to avoid any error in the brwser
    });
  },
});
