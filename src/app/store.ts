import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";
import navbarReducer from "../features/navbar/navbarSlice";
import modalReducer from "../features/modal/modalSlice";
import currentUserReducer from "../features/currentUserSlice";
import currentUserPlaylistsReducer from "../features/currentUserPlaylistsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    navbar: navbarReducer,
    modal: modalReducer,
    currentUser: currentUserReducer,
    currentUserPlaylists: currentUserPlaylistsReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export default store;
