import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { categoriesActions } from "../../store/categories-slice";
import { snackbarActions } from "../../store/snackbar-slice";
import classes from "./MovieUpdateForm.module.scss";

const MovieUpdateForm = (props) => {
  const { movieId, categoryId, isMovieUpdated, movieName } = props;

  const [movieNameInput, setMovieNameInput] = useState(movieName);

  const movieNameInputChangeHandler = (e) => {
    setMovieNameInput(e.target.value);
  };

  const nameInputRef = useRef();

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredInputValue = nameInputRef.current.value;

    if (enteredInputValue.trim().length > 0) {
      dispatch(
        categoriesActions.updateMovie({
          movieId,
          categoryId,
          newName: enteredInputValue,
        })
      );
      dispatch(
        snackbarActions.showSnackBar({
          type: "success",
          message: "Movie Updated Successfully",
        })
      );
      isMovieUpdated(true);
    }
  };

  const cancelUpdateHandler = () => {
    isMovieUpdated(true);
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes["movie-update-form"]}>
      <input
        ref={nameInputRef}
        className={classes["movie-update-form__input"]}
        type="text"
        placeholder="Enter new name"
        value={movieNameInput}
        onChange={movieNameInputChangeHandler}
        autoFocus={true}
      />
      <div className={classes["movie-update-form__controls"]}>
        <button type="submit" className="btn btn--edit btn--half-width">
          OK
        </button>
        <button
          type="button"
          className="btn btn--delete btn--half-width"
          onClick={cancelUpdateHandler}
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default MovieUpdateForm;
