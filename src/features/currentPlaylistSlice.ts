import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaylistResponse } from "../types/types";

const initialState: PlaylistResponse = {
  id: "",
  name: "",
  description: "",
  images: [],
  owner: { display_name: "" },
  public: false,
  tracks: { items: [] },
};

const currentPlaylistSlice = createSlice({
  name: "currentPlaylist",
  initialState,
  reducers: {
    setCurrentPlaylist: (state, action: PayloadAction<PlaylistResponse>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.images = action.payload.images;
      state.owner = action.payload.owner;
      state.public = action.payload.public;
      state.tracks = action.payload.tracks;
    },
  },
});

export const { setCurrentPlaylist } = currentPlaylistSlice.actions;

export default currentPlaylistSlice.reducer;
