import { notEmptyString } from "../../helpers/strings";
import classes from "./Form.module.scss";

const Form = (props) => {
  const {
    formData: { showForm, submitFormHandler },
    inputData: {
      categoryNameHasError,
      categoryDescHasError,
      categoryNameInputValue,
      categoryDescInputValue,
    },
    classes: { categoryNameInputClasses, categoryDescInputClasses },
    handlers: { onChangeCategoryNameHandler, onChangeCategoryDescHandler },
  } = props;
  return (
    <div className={classes["form"]}>
      {showForm && (
        <form onSubmit={submitFormHandler} className={classes["form__form"]}>
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
              className={`${classes["form__textarea"]} ${categoryDescInputClasses}`}
              value={categoryDescInputValue}
              onChange={onChangeCategoryDescHandler}
            ></textarea>
          </div>
          <button type="submit" className="btn btn--primary">
            Add
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
