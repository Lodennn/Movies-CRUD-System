import { createSlice } from "@reduxjs/toolkit";
import Data from "../db/movies-data.json";

const initialState = {
  categories: Data.categories,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    loadCategories(state, action) {
      state.categories = action.payload.categories;
    },
    addCategory(state, action) {
      state.categories = state.categories.concat(action.payload.category);
    },
    updateCategoryMovies(state, action) {
      const targetCategoryIndex = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      state.categories[targetCategoryIndex].movies = state.categories[
        targetCategoryIndex
      ].movies.concat(action.payload.newMovie);
    },
    updateMovie(state, action) {
      const targetCategoryIndex = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      const targetMovieIndex = state.categories[
        targetCategoryIndex
      ].movies.findIndex((movie) => movie.id === action.payload.movieId);

      state.categories[targetCategoryIndex].movies[targetMovieIndex] = {
        ...state.categories[targetCategoryIndex].movies[targetMovieIndex],
        name: action.payload.newName,
      };
    },
    deleteMovie(state, action) {
      const targetCategoryIndex = state.categories.findIndex(
        (category) => category.id === action.payload.categoryId
      );
      state.categories[targetCategoryIndex].movies = state.categories[
        targetCategoryIndex
      ].movies.filter((movie) => movie.id !== action.payload.movieId);
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice.reducer;
