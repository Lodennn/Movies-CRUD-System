import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { notEmptyString } from "../../helpers/strings";
import useInput from "../../hooks/use-input";
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

  const {
    value: categoryNameInputValue,
    isValid: categoryNameIsValid,
    hasError: categoryNameHasError,
    onChangeHandler: onChangeCategoryNameHandler,
    onResetHandler: onResetCategoryNameHandler,
  } = useInput((value) => value.trim().length >= 4);

  let categoryNameInputClasses =
    categoryNameHasError && notEmptyString(categoryNameInputValue)
      ? `${classes["new-category__input"]} invalid`
      : notEmptyString(categoryNameInputValue)
      ? `${classes["new-category__input"]} valid`
      : null;

  const {
    value: categoryDescInputValue,
    isValid: categoryDescIsValid,
    hasError: categoryDescHasError,
    onChangeHandler: onChangeCategoryDescHandler,
    onResetHandler: onResetCategoryDescHandler,
  } = useInput((value) => value.trim().length >= 10);

  let categoryDescInputClasses =
    categoryDescHasError && notEmptyString(categoryDescInputValue)
      ? `invalid`
      : notEmptyString(categoryDescInputValue)
      ? `valid`
      : null;

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
    if (categoryNameIsValid && categoryDescIsValid) {
      dispatch(
        categoriesActions.addCategory({
          category: newCategory,
        })
      );
      hideFormHandler();
    }
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
          <div className="form-control">
            <div className="fix-form-validation-msg">
              {categoryNameHasError &&
              notEmptyString(categoryNameInputValue) ? (
                <span className="error-msg">
                  Category name must be more than 5 characters
                </span>
              ) : notEmptyString(categoryNameInputValue) ? (
                <span className="success-msg">Category name is valid 😁</span>
              ) : null}
            </div>
            <input
              ref={categoryNameInputRef}
              type="text"
              placeholder="Name"
              className={categoryNameInputClasses}
              value={categoryNameInputValue}
              onChange={onChangeCategoryNameHandler}
            />
          </div>
          <div className="form-control fix-textarea-ltmirror">
            <div className="fix-form-validation-msg">
              {categoryDescHasError &&
              notEmptyString(categoryDescInputValue) ? (
                <span className="error-msg">
                  Category name must be more than 10 characters
                </span>
              ) : notEmptyString(categoryDescInputValue) ? (
                <span className="success-msg">
                  Category description is valid 😁
                </span>
              ) : null}
            </div>
            <textarea
              placeholder="Description"
              ref={categoryDescInputRef}
              className={`${classes["new-category__textarea"]} ${categoryDescInputClasses}`}
              value={categoryDescInputValue}
              onChange={onChangeCategoryDescHandler}
            ></textarea>
          </div>
          <button type="submit" className="btn btn--primary">
            Add Category
          </button>
        </form>
      )}
    </div>
  );
};

export default NewCategory;
