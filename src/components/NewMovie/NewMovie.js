import { useDispatch } from "react-redux";
import useForm from "../../hooks/use-form";
import useInput from "../../hooks/use-input";
import { categoriesActions } from "../../store/categories-slice";
import { snackbarActions } from "../../store/snackbar-slice";
import Form from "../UI/Form";
import { notEmptyString } from "../../helpers/strings";
import { FORM_MOVIE } from "../../helpers/constants";
import formClasses from "../UI/Form.module.scss";
import {
  inputNameValidator,
  inputDescriptionValidator,
} from "../../helpers/validate";

const NewMovie = (props) => {
  const { categoryId, hideForm, showForm } = props;

  const dispatch = useDispatch();

  const {
    value: nameInputValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    onChangeHandler: onChangeNameHandler,
  } = useInput(inputNameValidator);

  let nameInputClasses =
    nameHasError && notEmptyString(nameInputValue)
      ? `${formClasses["form__input"]} invalid`
      : notEmptyString(nameInputValue)
      ? `${formClasses["form__input"]} valid`
      : null;

  const {
    value: descriptionInputValue,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    onChangeHandler: onChangeDescriptionHandler,
  } = useInput(inputDescriptionValidator);

  let descriptionInputClasses =
    descriptionHasError && notEmptyString(descriptionInputValue)
      ? `invalid`
      : notEmptyString(descriptionInputValue)
      ? `valid`
      : null;

  const { submitFormHandler } = useForm(
    {
      nameIsValid,
      descriptionIsValid,
      nameInputValue,
      descriptionInputValue,
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
    name: nameInputValue,
    description: descriptionInputValue,
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
      formData={{ showForm, submitFormHandler, formFor: FORM_MOVIE }}
      inputData={{
        nameHasError,
        descriptionHasError,
        nameInputValue,
        descriptionInputValue,
      }}
      classes={{ nameInputClasses, descriptionInputClasses }}
      handlers={{ onChangeNameHandler, onChangeDescriptionHandler }}
    />
  );
};

export default NewMovie;
