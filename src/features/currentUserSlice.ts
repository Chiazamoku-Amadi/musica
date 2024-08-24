import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/types";

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  avatarUrl: null,
};

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
    },
    clearCurrentUser: (state) => {
      state.id = null;
      state.name = null;
      state.email = null;
      state.avatarUrl = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
