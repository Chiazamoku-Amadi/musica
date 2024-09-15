import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaylistResponse } from "../../types/types";

// const initialState: PlaylistResponse = {
//   id: "",
//   name: "",
//   description: "",
//   images: [],
//   owner: { display_name: "" },
//   public: false,
//   tracks: { items: [] },
// };

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
      // state.id = action.payload.id;
      // state.name = action.payload.name;
      // state.description = action.payload.description;
      // state.images = action.payload.images;
      // state.owner = action.payload.owner;
      // state.public = action.payload.public;
      // state.tracks = action.payload.tracks;
      state.currentPlaylist = action.payload;
    },
  },
});

export const { setCurrentPlaylist } = currentPlaylistSlice.actions;

export default currentPlaylistSlice.reducer;
