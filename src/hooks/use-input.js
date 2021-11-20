import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

/**
 * useInput Hook help you to set basic configurations of input to avoid DRY principle its accept a function that validate
 * the input and the hook receive the input value based on 'onChange' event
 * @param {*Callback Function} validate
 * @returns input data {value, isValid, hasError, onChange, onReset}
 * @author Khaled Nasser
 */
const inputReducer = (state = initialState, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value, isTouched: true };
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return state;
};

const useInput = (validate) => {
  const [inputData, dispatch] = useReducer(inputReducer, initialState);

  const isValid = validate(inputData.value);

  const hasError = !isValid;

  const onChangeInputHandler = (e) => {
    dispatch({ type: "CHANGE", value: e.target.value });
  };

  const onResetInputHandler = (e) => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputData.value,
    isValid,
    hasError,
    onChangeHandler: onChangeInputHandler,
    onResetHandler: onResetInputHandler,
  };
};

export default useInput;
