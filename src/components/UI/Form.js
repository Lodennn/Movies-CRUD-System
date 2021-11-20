import { FORM_CATEGORY } from "../../helpers/constants";
import { notEmptyString } from "../../helpers/strings";
import classes from "./Form.module.scss";

const Form = (props) => {
  const {
    formData: { showForm, submitFormHandler, formFor },
    inputData: {
      nameHasError,
      descriptionHasError,
      nameInputValue,
      descriptionInputValue,
    },
    classes: { nameInputClasses, descriptionInputClasses },
    handlers: { onChangeNameHandler, onChangeDescriptionHandler },
  } = props;
  return (
    <div className={classes["form"]}>
      {showForm && (
        <form onSubmit={submitFormHandler} className={classes["form__form"]}>
          <div className="form-control">
            <div className="fix-form-validation-msg">
              {nameHasError && notEmptyString(nameInputValue) ? (
                <span className="error-msg">
                  {formFor === FORM_CATEGORY ? "Category" : "Movie"} name must
                  be more than 5 characters
                </span>
              ) : notEmptyString(nameInputValue) ? (
                <span className="success-msg">
                  {formFor === FORM_CATEGORY ? "Category" : "Movie"} name is
                  valid 😁
                </span>
              ) : null}
            </div>
            <input
              type="text"
              placeholder="Name"
              className={nameInputClasses}
              value={nameInputValue}
              onChange={onChangeNameHandler}
            />
          </div>
          <div className="form-control fix-textarea-ltmirror">
            <div className="fix-form-validation-msg">
              {descriptionHasError && notEmptyString(descriptionInputValue) ? (
                <span className="error-msg">
                  {formFor === FORM_CATEGORY ? "Category" : "Movie"} description
                  must be more than 10 characters
                </span>
              ) : notEmptyString(descriptionInputValue) ? (
                <span className="success-msg">
                  {formFor === FORM_CATEGORY ? "Category" : "Movie"} description
                  is valid 😁
                </span>
              ) : null}
            </div>
            <textarea
              placeholder="Description"
              className={`${classes["form__textarea"]} ${descriptionInputClasses}`}
              value={descriptionInputValue}
              onChange={onChangeDescriptionHandler}
            ></textarea>
          </div>
          <button type="submit" className="btn btn--primary">
            Add {formFor === FORM_CATEGORY ? "Category" : "Movie"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
