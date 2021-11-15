import { notEmptyString } from "./strings";

export const checkInputValidaty = (value, hasError) => {
  return hasError && notEmptyString(value)
    ? `invalid`
    : notEmptyString(value)
    ? `valid`
    : null;
};
