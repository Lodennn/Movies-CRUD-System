import { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

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
