import { useState } from "react";
import { useDispatch } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
import { isArrayEmpty } from "../../helpers/arrays";
import { categoriesActions } from "../../store/categories-slice";
import { snackbarActions } from "../../store/snackbar-slice";
import MovieItem from "./MovieItem/MovieItem";
import classes from "./Movies.module.scss";

const Movies = (props) => {
  const { moviesList, categoryId } = props;

  const [editInput, setEditInput] = useState("");

  const dispatch = useDispatch();

  /**
   * Update the movie data [Name, Description]
   * @param {*string} movieId - movieId is used to detect which movie should we update
   * @implements set the 'editInput' state to 'movieId' so we can detect which movie it is.
   * @author Khaled Nasser
   */
  const onUpdateMovieHandler = (movieId) => {
    setEditInput(movieId);
  };

  const onDeleteMovieHandler = (movieId) => {
    dispatch(categoriesActions.deleteMovie({ movieId, categoryId }));
    dispatch(
      snackbarActions.showSnackBar({
        type: "success",
        message: "Movie Deleted Successfully",
      })
    );
  };

  const onCloseUpdateMode = (isUpdated) => {
    setEditInput(isUpdated);
  };

  return (
    <Fragment>
      <h2 className="title mb-xs">Movies</h2>
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
    </Fragment>
  );
};

export default Movies;
