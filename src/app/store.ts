import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";
import navbarReducer from "../features/navbar/navbarSlice";
import createNewPlaylistModalReducer from "../features/modal/createNewPlaylistModalSlice";
import currentUserReducer from "../features/currentUserSlice";
import currentUserPlaylistsReducer from "../features/playlist/currentUserPlaylistsSlice";
import addTracksToPlaylistModalReducer from "../features/modal/addTracksToPlaylistModalSlice";
import currentPlaylistReducer from "../features/playlist/currentPlaylistSlice";
import playerReducer from "../features/player/playerSlice";
import selectedArtistReducer from "../features/selectedArtistSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    navbar: navbarReducer,
    createNewPlaylistModal: createNewPlaylistModalReducer,
    currentUser: currentUserReducer,
    currentUserPlaylists: currentUserPlaylistsReducer,
    addTracksToPlaylistModal: addTracksToPlaylistModalReducer,
    currentPlaylist: currentPlaylistReducer,
    player: playerReducer,
    selectedArtist: selectedArtistReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export default store;
