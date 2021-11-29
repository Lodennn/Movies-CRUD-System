import { Fragment, useEffect, useState } from "react";
import MovieUpdateForm from "../../MovieUpdateForm/MovieUpdateForm";
import classes from "./MovieItem.module.scss";
import { AiFillStar } from "react-icons/ai";

const MovieItem = (props) => {
  const { id, name, description, rate } = props.movie;
  const { onDelete, onUpdate, editInput, categoryId, closeUpdateMode } = props;
  const [activeRateStars, setActiveRateStars] = useState([]);

  useEffect(() => {
    let ratePoints = Math.trunc(rate);
    let maxRatePoints = 5;
    let activeRateStarsTemp = [];
    setActiveRateStars((_) => {
      for (let i = 0; i < maxRatePoints; i++) {
        if (i <= ratePoints) {
          activeRateStarsTemp.push(true);
        } else {
          activeRateStarsTemp.push(false);
        }
      }
      return [...activeRateStarsTemp];
    });
  }, [rate]);

  const isMovieUpdatedHandler = () => {
    closeUpdateMode("");
  };

  return (
    <div className="animated-movie">
      <div className={classes.movie}>
        <div className={classes["movie__rate"]}>
          {activeRateStars &&
            activeRateStars.length > 0 &&
            activeRateStars.map((status, index) => {
              return (
                <span
                  key={index}
                  className={`${classes["movie__rate-star"]} ${
                    status ? classes[`movie__rate-star--active`] : null
                  }`}
                >
                  <AiFillStar />
                </span>
              );
            })}
        </div>
        {id !== +editInput ? (
          <Fragment>
            <h3 className={classes["movie__name"]}>{name}</h3>
            <p className={classes["movie__desc"]}>{description}</p>
            <div className={classes["movie__controls"]}>
              <button className="btn btn--edit" onClick={onUpdate.bind(null)}>
                Edit
              </button>
              <button className="btn btn--delete" onClick={onDelete}>
                Delete
              </button>
            </div>
          </Fragment>
        ) : (
          <MovieUpdateForm
            categoryId={categoryId}
            movieData={props.movie}
            isMovieUpdated={isMovieUpdatedHandler}
          />
        )}
      </div>
    </div>
  );
};

export default MovieItem;
