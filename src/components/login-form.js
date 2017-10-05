import React from 'react'
import PropTypes from 'prop-types'

import FormInput from './form-input'
import PasswordInput from './password-input'

const LoginForm = ({
  handleSubmit,
  handleChange,
  handleBlur,
  failure,
  filled,
  errors,
}) => (
  <form onSubmit={handleSubmit} noValidate autoComplete="off">
    <FormInput
      name="email"
      type="email"
      error={errors['email']}
      failure={failure}
      handleBlur={handleBlur}
      handleChange={handleChange}
      required
    />
    <PasswordInput
      name="password"
      error={errors['password']}
      failure={failure}
      handleBlur={handleBlur}
      handleChange={handleChange}
    />
    <button type="submit" disabled={!filled}>
      Submit
    </button>
  </form>
)

LoginForm.defaultProps = {
  errors: {},
  failure: false,
}

LoginForm.propTypes = {
  errors: PropTypes.object,
  failure: PropTypes.bool,
  filled: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm
