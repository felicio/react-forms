/** Test validity of an email based on pattern set by regular expression. */
export function emailIsValid(email) {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

  return regex.test(email)
}

/** Validate string made up of nothing but whitespace or empty as falsy value. */
export function valueIsEmpty(value) {
  const regex = /\s*/

  return !value || !value.split(regex).join('')
}
