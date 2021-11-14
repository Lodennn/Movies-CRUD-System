import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {},
  reducers: {},
});

export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;
