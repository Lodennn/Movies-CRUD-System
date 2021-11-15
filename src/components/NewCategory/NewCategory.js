import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addCategoriesToStorage,
  categoriesActions,
} from "../../store/categories-slice";
import classes from "./NewCategory.module.scss";

const NewCategory = () => {
  const categoryNameInputRef = useRef();
  const categoryDescInputRef = useRef();

  const dispatch = useDispatch();

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
    // dispatch(addCategoriesToStorage());
  };

  return (
    <div className={classes["new-category"]}>
      <form
        onSubmit={submitFormHandler}
        className={classes["new-category__form"]}
      >
        <input
          ref={categoryNameInputRef}
          type="text"
          placeholder="Enter a name"
          className={classes["new-category__input"]}
        />
        <textarea
          placeholder="Enter a description"
          ref={categoryDescInputRef}
        ></textarea>
        <button type="submit" className="btn btn--submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default NewCategory;
