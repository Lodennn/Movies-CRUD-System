import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { notEmptyString } from "../../helpers/strings";
import useInput from "../../hooks/use-input";
import { categoriesActions } from "../../store/categories-slice";
import Button from "../UI/Button";
import classes from "./NewCategory.module.scss";

const useForm = () => {
  const [showForm, setShowForm] = useState(false);

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
    const newCategory = {
      // NOT RECOMMENDED - AUTO GENERATING DYNAMIC ID
      id: Math.random() + new Date().getTime(),
      name: categoryNameInputValue,
      desc: categoryDescInputValue,
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

  return {
    formData: {
      showForm,
      showFormHandler,
      hideFormHandler,
      submitFormHandler,
    },
    categoryData: {
      categoryNameHasError,
      categoryDescHasError,
      categoryNameIsValid,
      categoryDescInputValue,
    },
    handlers: {
      onChangeCategoryNameHandler,
      onChangeCategoryDescHandler,
    },
    classes: {
      categoryNameInputClasses,
      categoryDescInputClasses,
    },
  };
};

export default useForm;
