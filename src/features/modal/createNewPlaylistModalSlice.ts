import { createSlice } from "@reduxjs/toolkit";

const createNewPlaylistModalSlice = createSlice({
  name: "createNewPlaylistModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleModal } = createNewPlaylistModalSlice.actions;

export default createNewPlaylistModalSlice.reducer;
