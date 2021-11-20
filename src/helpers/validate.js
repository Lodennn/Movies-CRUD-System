/**
 * Update the movie data [Name, Description]
 * @param {*string} value
 * @returns boolean value which checks if the input value(movie name) is validate or not
 * @author Khaled Nasser
 */
export function movieNameValidator(value) {
  return value.trim().length >= 5;
}

/**
 * Update the movie data [Name, Description]
 * @param {*string} value
 * @returns boolean value which checks if the input value(description name) is validate or not
 * @author Khaled Nasser
 */
export function movieDescValidator(value) {
  return value.trim().length >= 10;
}

export function inputNameValidator(value) {
  return value.trim().length >= 4;
}

export function inputDescriptionValidator(value) {
  return value.trim().length >= 10;
}
