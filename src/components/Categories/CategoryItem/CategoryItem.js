import { Fragment } from "react/cjs/react.production.min";
import { isArrayEmpty } from "../../../helpers/arrays";
import Movies from "../../Movies/Movies";
import NewMovie from "../../NewMovie/NewMovie";
import classes from "./CategoryItem.module.scss";

const CategoryItem = (props) => {
  const { activeCategoryClass, onClick } = props;
  const { id, name, movies, desc } = props.category;

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
              {desc ? desc : "Empty"}
            </h5>
          </div>
          {/* New Movie Component */}
          <NewMovie categoryId={id} />
          {/* New Movie Component */}

          {/* Movies Component */}
          {movies && isArrayEmpty(movies) ? (
            <Movies categoryId={id} moviesList={movies} />
          ) : (
            "No Movies"
          )}
          {/* Movies Component */}
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryItem;
