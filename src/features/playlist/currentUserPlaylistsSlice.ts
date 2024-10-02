import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaylistResponse } from "../../types/types";

const initialState: PlaylistResponse[] = [];

const currentUserPlaylistsSlice = createSlice({
  name: "currentUserPlaylists",
  initialState,
  reducers: {
    setCurrentUserPlaylists: (
      state,
      action: PayloadAction<PlaylistResponse[]>
    ) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { setCurrentUserPlaylists } = currentUserPlaylistsSlice.actions;

export default currentUserPlaylistsSlice.reducer;
