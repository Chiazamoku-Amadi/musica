import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Playlist } from "../types/types";

const initialState: Playlist[] = [];

const currentUserPlaylistsSlice = createSlice({
  name: "currentUserPlaylists",
  initialState,
  reducers: {
    setCurrentUserPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      return action.payload;
    },
  },
});

export const { setCurrentUserPlaylists } = currentUserPlaylistsSlice.actions;

export default currentUserPlaylistsSlice.reducer;
