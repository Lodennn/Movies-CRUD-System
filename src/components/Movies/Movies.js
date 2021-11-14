import MovieItem from "./MovieItem/MovieItem";
import classes from "./Movies.module.scss";

const Movies = () => {
  return (
    <div className={classes.movies}>
      <MovieItem />
      <MovieItem />
      <MovieItem />
    </div>
  );
};

export default Movies;
