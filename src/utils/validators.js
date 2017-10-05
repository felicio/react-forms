import { isNil } from 'ramda'

/** Validate email based on pattern set with regular expression. */
export function emailIsValid(email) {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

  return regex.test(email)
}

/** Validate string made up of nothing but whitespace or empty as falsy value. */
export function isEmpty(value) {
  const regex = /\s*/

  return !value || !value.split(regex).join('')
}

export const required = {
  fn: value => !isNil(value),
  msg: 'This field is mandatory',
}

export const email = {
  fn: value => /\S+@\S+\.\S+/.test(value),
  msg: 'Must be correct email address',
}

export const minLength = length => ({
  fn: value => value && value.length >= length,
  msg: `Must be at least ${length} characters long`,
})

export const number = {
  fn: value => /^-?\d+\.?\d*$/.test(value),
  msg: 'Must be a valid number',
}
