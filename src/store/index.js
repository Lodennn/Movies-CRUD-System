import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./categories-slice";
import moviesReducer from "./movies-slice";

const store = configureStore({
  reducer: { categories: categoriesReducer, movies: moviesReducer },
});

export default store;
