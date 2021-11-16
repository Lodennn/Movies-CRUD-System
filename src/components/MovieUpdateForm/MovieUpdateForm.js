import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { movieDescValidator, movieNameValidator } from "../../helpers/validate";
import { categoriesActions } from "../../store/categories-slice";
import { snackbarActions } from "../../store/snackbar-slice";
import classes from "./MovieUpdateForm.module.scss";

const MovieUpdateForm = (props) => {
  const { categoryId, isMovieUpdated } = props;

  //prettier-ignore
  const {id: movieId, name: movieName, description: movieDescription} = props.movieData;

  const initialState = {
    movieNameInput: movieName,
    movieDescInput: movieDescription,
    movieNameIsTouched: false,
    movieDescIsTouched: false,
  };

  const updateReducer = (state = initialState, action) => {
    if (action.type === "CHANGE_NAME") {
      return {
        ...state,
        movieNameInput: action.value,
        movieNameIsTouched: true,
      };
    }
    if (action.type === "CHANGE_DESC") {
      return {
        ...state,
        movieDescInput: action.value,
        movieDescIsTouched: true,
      };
    }
    return state;
  };

  const [updateData, dispatchUpdate] = useReducer(updateReducer, initialState);

  let movieNameHasError = !movieNameValidator(updateData.movieNameInput);
  let movieDescHasError = !movieDescValidator(updateData.movieDescInput);

  let categoryNameInputClasses = movieNameHasError
    ? `${classes["form__input"]} invalid`
    : null;

  let categoryDescInputClasses = movieDescHasError ? `invalid` : null;

  const movieNameInputChangeHandler = (e) => {
    dispatchUpdate({ type: "CHANGE_NAME", value: e.target.value });
  };
  const movieDescInputChangeHandler = (e) => {
    dispatchUpdate({ type: "CHANGE_DESC", value: e.target.value });
  };

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (
      movieNameValidator(updateData.movieNameInput) &&
      movieDescValidator(updateData.movieDescInput)
    ) {
      dispatch(
        categoriesActions.updateMovie({
          movieId,
          categoryId,
          newName: updateData.movieNameInput,
          newDesc: updateData.movieDescInput,
        })
      );
      dispatch(
        snackbarActions.showSnackBar({
          type: "success",
          message: "Movie Updated Successfully",
        })
      );
      isMovieUpdated(true);
    } else {
      dispatch(
        snackbarActions.showSnackBar({
          type: "error",
          message: "Please enter a valid data",
        })
      );
    }
  };

  const cancelUpdateHandler = () => {
    isMovieUpdated(true);
  };

  return (
    <form onSubmit={formSubmitHandler} className={classes["movie-update-form"]}>
      <input
        className={categoryNameInputClasses}
        type="text"
        placeholder="Enter new name"
        value={updateData.movieNameInput}
        onChange={movieNameInputChangeHandler}
        autoFocus={true}
      />
      <textarea
        className={`${classes["movie-update-form__textarea"]} ${categoryDescInputClasses}`}
        placeholder="Enter new description"
        value={updateData.movieDescInput}
        onChange={movieDescInputChangeHandler}
      ></textarea>
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
