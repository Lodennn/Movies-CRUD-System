import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { notEmptyString } from "../../helpers/strings";
import useForm from "../../hooks/use-form";
import useInput from "../../hooks/use-input";
import { categoriesActions } from "../../store/categories-slice";
import Button from "../UI/Button";
import Form from "../UI/Form";
// import classes from "./NewCategory.module.scss";
import classes from "../UI/Form.module.scss";

const NewCategory = () => {
  const dispatch = useDispatch();

  const {
    value: categoryNameInputValue,
    isValid: categoryNameIsValid,
    hasError: categoryNameHasError,
    onChangeHandler: onChangeCategoryNameHandler,
    onResetHandler: onResetCategoryNameHandler,
  } = useInput((value) => value.trim().length >= 4);

  let categoryNameInputClasses =
    categoryNameHasError && notEmptyString(categoryNameInputValue)
      ? `${classes["form__input"]} invalid`
      : notEmptyString(categoryNameInputValue)
      ? `${classes["form__input"]} valid`
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

  const { showForm, hideFormHandler, showFormHandler, submitFormHandler } =
    useForm(
      {
        categoryNameIsValid,
        categoryDescIsValid,
        categoryNameInputValue,
        categoryDescInputValue,
      },
      dispatchAddCategoryAction
    );

  const newCategory = {
    // NOT RECOMMENDED - AUTO GENERATING DYNAMIC ID
    id: Math.random() + new Date().getTime(),
    name: categoryNameInputValue,
    desc: categoryDescInputValue,
    movies: [],
  };
  function dispatchAddCategoryAction() {
    dispatch(
      categoriesActions.addCategory({
        category: newCategory,
      })
    );
    hideFormHandler();
  }

  return (
    <Fragment>
      {!showForm ? (
        <Button text="Add Category" onClick={showFormHandler} />
      ) : (
        <Form
          formData={{ showForm, submitFormHandler }}
          inputData={{
            categoryNameHasError,
            categoryDescHasError,
            categoryNameInputValue,
            categoryDescInputValue,
          }}
          classes={{ categoryNameInputClasses, categoryDescInputClasses }}
          handlers={{
            onChangeCategoryNameHandler,
            onChangeCategoryDescHandler,
          }}
        />
      )}
    </Fragment>
  );
};

export default NewCategory;
