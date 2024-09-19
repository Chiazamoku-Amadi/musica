import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaylistResponse } from "../../types/types";

export interface PlaylistState {
  currentPlaylist: PlaylistResponse | null;
}

const initialState: PlaylistState = {
  currentPlaylist: null,
};

const currentPlaylistSlice = createSlice({
  name: "currentPlaylist",
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action: PayloadAction<PlaylistResponse>) => {
      state.currentPlaylist = action.payload;
    },
  },
});

export const { setCurrentPlaylist } = currentPlaylistSlice.actions;

export default currentPlaylistSlice.reducer;
