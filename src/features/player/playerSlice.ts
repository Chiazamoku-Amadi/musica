import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentlyPlayingTrackResponse } from "../../types/types";

export interface PlayerState {
  currentlyPlayingTrack: CurrentlyPlayingTrackResponse | null;
  isPlaying: boolean;
}

const initialState: PlayerState = {
  currentlyPlayingTrack: null,
  isPlaying: false,
};

const PlayerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentlyPlayingTrack: (
      state,
      action: PayloadAction<CurrentlyPlayingTrackResponse>
    ) => {
      state.currentlyPlayingTrack = action.payload;
    },
    playTrack: (state) => {
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { setCurrentlyPlayingTrack, playTrack, pauseTrack } =
  PlayerSlice.actions;

export default PlayerSlice.reducer;
