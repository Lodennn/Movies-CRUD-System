import { createSlice } from "@reduxjs/toolkit";
import Data from "../db/movies-data.json";

const initialState = {
  categories: Data,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    addCategory(state, action) {
      state.categories = [...state.categories].push(action.payload.category);
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice.reducer;
