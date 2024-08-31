import { createSlice } from "@reduxjs/toolkit";

const addTracksToPlaylistModalSlice = createSlice({
  name: "addTracksToPlaylistModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = addTracksToPlaylistModalSlice.actions;

export default addTracksToPlaylistModalSlice.reducer;
