import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArtistResponse } from "../types/types";

export interface ArtistState {
  selectedArtist: ArtistResponse | null;
}

const initialState: ArtistState = {
  selectedArtist: null,
};

const selectedArtistSlice = createSlice({
  name: "selectedArtist",
  initialState,
  reducers: {
    setSelectedArtist: (state, action: PayloadAction<ArtistResponse>) => {
      state.selectedArtist = action.payload;
    },
  },
});

export const { setSelectedArtist } = selectedArtistSlice.actions;

export default selectedArtistSlice.reducer;
