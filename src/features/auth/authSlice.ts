import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("spotify_access_token", action.payload);
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      localStorage.removeItem("spotify_access_token");
    },
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
