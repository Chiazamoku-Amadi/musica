import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    openNav: true,
  },
  reducers: {
    toggleNavbar: (state) => {
      state.openNav = !state.openNav;
    },
  },
});

export const { toggleNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
