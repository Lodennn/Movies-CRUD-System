import MovieUpdateForm from "../../MovieUpdateForm/MovieUpdateForm";
import classes from "./MovieItem.module.scss";

const MovieItem = (props) => {
  const { id, name } = props.movie;
  const { onDelete, onUpdate, editInput, categoryId, closeUpdateMode } = props;
  const isMovieUpdatedHandler = () => {
    closeUpdateMode("");
  };

  return (
    <div className={classes.movie}>
      {id !== +editInput && <h3 className={classes["movie__name"]}>{name}</h3>}
      {id === +editInput && (
        <MovieUpdateForm
          categoryId={categoryId}
          movieId={id}
          movieName={name}
          isMovieUpdated={isMovieUpdatedHandler}
        />
      )}
      <div className={classes["movie__controls"]}>
        <button className={classes["movie__controls--edit"]} onClick={onUpdate}>
          Edit
        </button>
        <button
          className={classes["movie__controls--delete"]}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieItem;
