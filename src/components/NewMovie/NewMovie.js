import { useDispatch } from "react-redux";
import { notEmptyString } from "../../helpers/strings";
import useForm from "../../hooks/use-form";
import useInput from "../../hooks/use-input";
import { categoriesActions } from "../../store/categories-slice";
import Form from "../UI/Form";
import classes from "./NewMovie.module.scss";

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
      ? `${classes["new-category__input"]} invalid`
      : notEmptyString(categoryNameInputValue)
      ? `${classes["new-category__input"]} valid`
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

  const newMovie = {
    // NOT RECOMMENDED - GENERATING DYNAMIC ID
    id: Math.random() + new Date().getTime(),
    name: categoryNameInputValue,
    description: categoryDescInputValue,
    rate: generateRandomRating(),
  };

  function dispatchAddMovieAction() {
    dispatch(categoriesActions.updateCategoryMovies({ categoryId, newMovie }));
    hideForm();
  }

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
    // <div className={classes["new-movie"]}>
    //   {showForm && (
    //     <form
    //       onSubmit={submitFormHandler}
    //       className={classes["new-movie__form"]}
    //     >
    //       <div className="form-control">
    //         <div className="fix-form-validation-msg">
    //           {categoryNameHasError &&
    //           notEmptyString(categoryNameInputValue) ? (
    //             <span className="error-msg">
    //               Category name must be more than 5 characters
    //             </span>
    //           ) : notEmptyString(categoryNameInputValue) ? (
    //             <span className="success-msg">Category name is valid 😁</span>
    //           ) : null}
    //         </div>
    //         <input
    //           type="text"
    //           placeholder="Name"
    //           className={categoryNameInputClasses}
    //           value={categoryNameInputValue}
    //           onChange={onChangeCategoryNameHandler}
    //         />
    //       </div>
    //       <div className="form-control fix-textarea-ltmirror">
    //         <div className="fix-form-validation-msg">
    //           {categoryDescHasError &&
    //           notEmptyString(categoryDescInputValue) ? (
    //             <span className="error-msg">
    //               Category name must be more than 10 characters
    //             </span>
    //           ) : notEmptyString(categoryDescInputValue) ? (
    //             <span className="success-msg">
    //               Category description is valid 😁
    //             </span>
    //           ) : null}
    //         </div>
    //         <textarea
    //           placeholder="Description"
    //           className={`${classes["new-category__textarea"]} ${categoryDescInputClasses}`}
    //           value={categoryDescInputValue}
    //           onChange={onChangeCategoryDescHandler}
    //         ></textarea>
    //       </div>
    //       <button type="submit" className="btn btn--primary">
    //         Add Movie
    //       </button>
    //     </form>
    //   )}
    // </div>
  );
};

export default NewMovie;
