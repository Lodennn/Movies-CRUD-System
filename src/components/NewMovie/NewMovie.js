import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { categoriesActions } from "../../store/categories-slice";
import classes from "./NewMovie.module.scss";

const NewMovie = (props) => {
  const { categoryId } = props;

  const movieNameRef = useRef();
  const movieDescRef = useRef();

  const dispatch = useDispatch();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredMovieName = movieNameRef.current.value;
    const enteredMovieDesc = movieDescRef.current.value;

    const newMovie = {
      // NOT RECOMMENDED - GENERATING DYNAMIC ID
      id: Math.random() + new Date().getTime(),
      name: enteredMovieName,
      description: enteredMovieDesc,
      rate: generateRandomRating(),
    };

    dispatch(categoriesActions.updateCategoryMovies({ categoryId, newMovie }));
  };

  const generateRandomRating = () => {
    let max = 5;
    let randomRate = (Math.random() * max).toFixed(1);
    return randomRate;
  };

  return (
    <div className={classes["new-movie"]}>
      <form onSubmit={submitFormHandler} className={classes["new-movie__form"]}>
        <input
          ref={movieNameRef}
          type="text"
          placeholder="Enter a name"
          className={classes["new-movie__input"]}
        />
        <textarea
          ref={movieDescRef}
          placeholder="Enter a description"
        ></textarea>
        <button type="submit" className="btn btn--submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewMovie;
