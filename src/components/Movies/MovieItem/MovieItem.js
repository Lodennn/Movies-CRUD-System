import classes from "./MovieItem.module.scss";

const MovieItem = () => {
  return (
    <div className={classes.movie}>
      <h3 className={classes["movie__name"]}>Movie Name</h3>
      <div className={classes["movie__controls"]}>
        <button className={classes["movie__controls--edit"]}>Edit</button>
        <button className={classes["movie__controls--delete"]}>Delete</button>
      </div>
    </div>
  );
};

export default MovieItem;
