import { Fragment } from "react/cjs/react.production.min";
import Movies from "../../Movies/Movies";
import NewMovie from "../../NewMovie/NewMovie";
import classes from "./CategoryItem.module.scss";

const CategoryItem = (props) => {
  const { activeCategoryClass, onClick } = props;
  const { name, movies, description } = props.category;

  return (
    <Fragment>
      <div className={classes.category}>
        <header className={classes["category__header"]} onClick={onClick}>
          <h3 className={classes["category__name"]}>{name}</h3>
        </header>
        <div className={`${classes["category__data"]} ${activeCategoryClass}`}>
          <div className={classes["category__data-item"]}>
            <h5 className={classes["category__data-item--label"]}>Name</h5>
            <h5 className={classes["category__data-item--value"]}>{name}</h5>
          </div>
          <div className={classes["category__data-item"]}>
            <h5 className={classes["category__data-item--label"]}>
              Description
            </h5>
            <h5 className={classes["category__data-item--value"]}>
              {description ? description : "Empty"}
            </h5>
          </div>
          {/* New Movie Component */}
          <NewMovie />
          {/* New Movie Component */}

          {/* Movies Component */}
          <Movies moviesList={movies} />
          {/* Movies Component */}
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryItem;
