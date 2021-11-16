import { useDispatch } from "react-redux";
import { notEmptyString } from "../../helpers/strings";
import useForm from "../../hooks/use-form";
import useInput from "../../hooks/use-input";
import { categoriesActions } from "../../store/categories-slice";
import Form from "../UI/Form";
import formClasses from "../UI/Form.module.scss";
import { snackbarActions } from "../../store/snackbar-slice";

const NewMovie = (props) => {
  const { categoryId, hideForm, showForm } = props;

  const dispatch = useDispatch();

  const {
    value: categoryNameInputValue,
    isValid: categoryNameIsValid,
    hasError: categoryNameHasError,
    onChangeHandler: onChangeCategoryNameHandler,
  } = useInput((value) => value.trim().length >= 4);

  let categoryNameInputClasses =
    categoryNameHasError && notEmptyString(categoryNameInputValue)
      ? `${formClasses["form__input"]} invalid`
      : notEmptyString(categoryNameInputValue)
      ? `${formClasses["form__input"]} valid`
      : null;

  const {
    value: categoryDescInputValue,
    isValid: categoryDescIsValid,
    hasError: categoryDescHasError,
    onChangeHandler: onChangeCategoryDescHandler,
  } = useInput((value) => value.trim().length >= 10);

  let categoryDescInputClasses =
    categoryDescHasError && notEmptyString(categoryDescInputValue)
      ? `invalid`
      : notEmptyString(categoryDescInputValue)
      ? `valid`
      : null;

  const { submitFormHandler } = useForm(
    {
      categoryNameIsValid,
      categoryDescIsValid,
      categoryNameInputValue,
      categoryDescInputValue,
    },
    dispatchAddMovieAction
  );

  function dispatchAddMovieAction() {
    dispatch(categoriesActions.addMovieToCategory({ categoryId, newMovie }));
    dispatch(
      snackbarActions.showSnackBar({
        type: "success",
        message: "Movie Added Successfully",
      })
    );
    hideForm();
  }

  const newMovie = {
    // NOT RECOMMENDED - GENERATING DYNAMIC ID
    id: Math.random() + new Date().getTime(),
    name: categoryNameInputValue,
    description: categoryDescInputValue,
    rate: generateRandomRating(),
  };

  /**
   * generate random rating to movie
   * @returns generated random rate number out of 5
   * @author Khaled Nasser
   */
  function generateRandomRating() {
    let max = 5;
    let randomRate = (Math.random() * max).toFixed(1);
    return randomRate;
  }

  return (
    <Form
      formData={{ showForm, submitFormHandler }}
      inputData={{
        categoryNameHasError,
        categoryDescHasError,
        categoryNameInputValue,
        categoryDescInputValue,
      }}
      classes={{ categoryNameInputClasses, categoryDescInputClasses }}
      handlers={{ onChangeCategoryNameHandler, onChangeCategoryDescHandler }}
    />
  );
};

export default NewMovie;
