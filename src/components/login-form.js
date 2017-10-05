import React from 'react'
import PropTypes from 'prop-types'

import { emailIsValid, valueIsEmpty } from '../utils/validators'

import FormInput from './form-input'
import PasswordInput from './password-input'

export const inputs = [
  {
    type: 'email',
    name: 'email',
    required: true,
    validate(value) {
      if (valueIsEmpty(value) && this.required) {
        return `${this.name} is required`
      }

      if (!emailIsValid(value)) {
        return `${this.name} is not valid`
      }
    },
  },
]

export default class LoginForm extends React.PureComponent {
  render() {
    const { handleSubmit, handleChange, failure, valid } = this.props

    return (
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <FormInput name="email" type="email" failure={failure} handleChange={handleChange} required />
        <PasswordInput name="password" failure={failure} handleChange={handleChange} />
        <button type="submit" disabled={!valid}>Submit</button>
      </form>
    )
  }
}

LoginForm.defaultProps = {
  failure: false,
}

LoginForm.propTypes = {
  failure: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
}
