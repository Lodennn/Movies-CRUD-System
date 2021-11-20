import { Fragment, useState } from "react";
import { isArrayEmpty } from "../../../helpers/arrays";
import Movies from "../../Movies/Movies";
import NewMovie from "../../NewMovie/NewMovie";
import Wrapper from "../../UI/Wrapper";
import Button from "../../UI/Button";
import { FaBarcode, FaChevronDown } from "react-icons/fa";
import classes from "./CategoryItem.module.scss";

const CategoryItem = (props) => {
  const { activeCategoryClass, onClick } = props;
  const { id, name, movies, desc } = props.category;

  const [showForm, setShowForm] = useState(false);

  const showFormHandler = () => {
    setShowForm(true);
  };
  const hideFormHandler = () => {
    setShowForm(false);
  };

  return (
    <Fragment>
      <div className={classes.category}>
        <header className={classes["category__header"]} onClick={onClick}>
          <span className={classes["category__icon"]}>
            <FaBarcode className="fix-icon" />
          </span>
          <h3 className={classes["category__name"]}>{name}</h3>
          <span className={classes["category__icon"]}>
            <FaChevronDown className="fix-icon" />
          </span>
        </header>
        <Wrapper
          className={`${classes["category__data"]} ${activeCategoryClass}`}
        >
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
          <hr className="separator separator--soft" />

          {/* New Movie Component */}
          {showForm ? (
            <NewMovie
              categoryId={id}
              hideForm={hideFormHandler}
              showForm={showForm}
            />
          ) : (
            <Button
              text="Add Movie"
              className="btn-pos-right"
              onClick={showFormHandler}
            />
          )}
          {/* New Movie Component */}

          {/* Movies Component */}
          {movies && isArrayEmpty(movies) ? (
            <Movies categoryId={id} moviesList={movies} />
          ) : (
            <p className="mt-sm">No Movies</p>
          )}
          {/* Movies Component */}
        </Wrapper>
      </div>
    </Fragment>
  );
};

export default CategoryItem;
