import { useState } from "react";
import { useDispatch } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
import { isArrayEmpty } from "../../helpers/arrays";
import { categoriesActions } from "../../store/categories-slice";
import MovieItem from "./MovieItem/MovieItem";
import classes from "./Movies.module.scss";

const Movies = (props) => {
  const { moviesList, categoryId } = props;

  const [editInput, setEditInput] = useState("");

  const dispatch = useDispatch();

  const onUpdateMovieHandler = (movieId) => {
    setEditInput(movieId);
  };

  const onDeleteMovieHandler = (movieId) => {
    dispatch(categoriesActions.deleteMovie({ movieId, categoryId }));
  };

  const onCloseUpdateMode = (isUpdated) => {
    setEditInput(isUpdated);
  };

  return (
    <div className={classes.movies}>
      {moviesList &&
        isArrayEmpty(moviesList) &&
        moviesList.map((movie) => {
          return (
            <MovieItem
              key={movie.id}
              movie={movie}
              onDelete={onDeleteMovieHandler.bind(null, movie.id)}
              onUpdate={onUpdateMovieHandler.bind(null, movie.id)}
              editInput={editInput}
              categoryId={categoryId}
              closeUpdateMode={onCloseUpdateMode}
            />
          );
        })}
    </div>
  );
};

export default Movies;
