import { useState } from "react";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../store/snackbar-slice";

const useForm = (inputData, action) => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const showFormHandler = () => {
    setShowForm(true);
  };
  const hideFormHandler = () => {
    setShowForm(false);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (inputData.categoryNameIsValid && inputData.categoryDescIsValid) {
      action();
    } else {
      dispatch(
        snackbarActions.showSnackBar({
          type: "error",
          message: "Please enter a valid data",
        })
      );
    }
  };

  return {
    showForm,
    showFormHandler,
    hideFormHandler,
    submitFormHandler,
  };
};

export default useForm;
