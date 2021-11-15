import { useState } from "react";

const useForm = (inputData, action) => {
  const [showForm, setShowForm] = useState(false);

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
