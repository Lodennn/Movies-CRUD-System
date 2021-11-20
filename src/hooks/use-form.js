import { useState } from "react";
import { useDispatch } from "react-redux";
import { snackbarActions } from "../store/snackbar-slice";

/**
 * useForm Hook help you to set basic configurations of form to avoid DRY principle its accept the input data that form needed
 * and dispatch an action based on the nature of received data
 * @param {*object} inputData
 * @param {*Callback Function} action
 * @returns form data and status if it displayed or not and the submit form function
 * @author Khaled Nasser
 */
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
    if (inputData.nameIsValid && inputData.descriptionIsValid) {
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
