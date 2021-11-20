import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { notEmptyString } from "../../helpers/strings";
import useForm from "../../hooks/use-form";
import useInput from "../../hooks/use-input";
import { categoriesActions } from "../../store/categories-slice";
import { snackbarActions } from "../../store/snackbar-slice";
import Button from "../UI/Button";
import Form from "../UI/Form";
import classes from "../UI/Form.module.scss";
import { FORM_CATEGORY } from "../../helpers/constants";
import {
  inputNameValidator,
  inputDescriptionValidator,
} from "../../helpers/validate";

const NewCategory = () => {
  const dispatch = useDispatch();

  const {
    value: nameInputValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: onChangeNameHandler,
    onResetHandler: onResetNameHandler,
  } = useInput(inputNameValidator);

  let nameInputClasses =
    nameHasError && notEmptyString(nameInputValue)
      ? `${classes["form__input"]} invalid`
      : notEmptyString(nameInputValue)
      ? `${classes["form__input"]} valid`
      : null;

  const {
    value: descriptionInputValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    onChangeHandler: onChangeDescriptionHandler,
    onResetHandler: onResetDescHandler,
  } = useInput(inputDescriptionValidator);

  let descriptionInputClasses =
    descriptionHasError && notEmptyString(descriptionInputValue)
      ? `invalid`
      : notEmptyString(descriptionInputValue)
      ? `valid`
      : null;

  const { showForm, hideFormHandler, showFormHandler, submitFormHandler } =
    useForm(
      {
        nameIsValid,
        descriptionIsValid,
        nameInputValue,
        descriptionInputValue,
      },
      dispatchAddCategoryAction
    );

  const newCategory = {
    // NOT RECOMMENDED - AUTO GENERATING DYNAMIC ID
    id: Math.random() + new Date().getTime(),
    name: nameInputValue,
    desc: descriptionInputValue,
    movies: [],
  };
  function dispatchAddCategoryAction() {
    dispatch(
      categoriesActions.addCategory({
        category: newCategory,
      })
    );
    dispatch(
      snackbarActions.showSnackBar({
        type: "success",
        message: "Category Added Successfully",
      })
    );
    hideFormHandler();
    clearInputs();
  }

  function clearInputs() {
    onResetNameHandler();
    onResetDescHandler();
  }

  return (
    <Fragment>
      {!showForm ? (
        <Button text="Add Category" onClick={showFormHandler} />
      ) : (
        <Form
          formData={{ showForm, submitFormHandler, formFor: FORM_CATEGORY }}
          inputData={{
            nameHasError,
            descriptionHasError,
            nameInputValue,
            descriptionInputValue,
          }}
          classes={{ nameInputClasses, descriptionInputClasses }}
          handlers={{
            onChangeNameHandler,
            onChangeDescriptionHandler,
          }}
        />
      )}
    </Fragment>
  );
};

export default NewCategory;
