import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export default store;
