import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { categoriesActions } from "../../store/categories-slice";
import Button from "../UI/Button";
import classes from "./NewCategory.module.scss";

const NewCategory = () => {
  const [showForm, setShowForm] = useState(false);

  const categoryNameInputRef = useRef();
  const categoryDescInputRef = useRef();

  const dispatch = useDispatch();

  const showFormHandler = () => {
    setShowForm(true);
  };
  const hideFormHandler = () => {
    setShowForm(false);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredCategoryName = categoryNameInputRef.current.value;
    const enteredCategoryDesc = categoryDescInputRef.current.value;
    const newCategory = {
      // NOT RECOMMENDED - AUTO GENERATING DYNAMIC ID
      id: Math.random() + new Date().getTime(),
      name: enteredCategoryName,
      desc: enteredCategoryDesc,
      movies: [],
    };

    dispatch(
      categoriesActions.addCategory({
        category: newCategory,
      })
    );

    hideFormHandler();
  };

  return (
    <div className={classes["new-category"]}>
      {!showForm ? (
        <Button text="Add Category" onClick={showFormHandler} />
      ) : (
        <form
          onSubmit={submitFormHandler}
          className={classes["new-category__form"]}
        >
          <input
            ref={categoryNameInputRef}
            type="text"
            placeholder="Name"
            className={classes["new-category__input"]}
          />
          <textarea
            placeholder="Description"
            ref={categoryDescInputRef}
            className={classes["new-category__textarea"]}
          ></textarea>
          <button type="submit" className="btn btn--primary">
            Add Category
          </button>
        </form>
      )}
    </div>
  );
};

export default NewCategory;
