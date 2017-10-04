import React from 'react'

import LoginForm, { inputs as formInputs } from '../components/login-form'

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
      // Received prop from a store.
      loginFailure: false,
    }
    this.formIsValid = formIsValid.bind(this)
  }

  handleChange = (name, value) => {
    this.setState(prevState => ({
      inputs: { ...prevState.inputs, [name]: value },
    }))
  }

  handleError = (name, value) => {
    this.setState(prevState => ({
      errors: { ...prevState.errors, [name]: value },
    }))
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.formIsValid(formInputs)) {
      const { email, password } = this.state.inputs

      const payload = {
        email,
        password,
      }

      console.dir(payload)
    }
  }

  render() {
    const { loginFailure, errors } = this.state

    return (
      <div>
        <h1>Login</h1>
        {loginFailure && <span style={{ color: 'red' }}>Error</span>}
        <LoginForm
          failure={loginFailure}
          errors={errors}
          onChange={this.handleChange}
          onError={this.handleError}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

/** Validates all form inputs and optionally sets state of `errors` object. */
function formIsValid(inputs) {
  const errors = {}

  inputs.forEach(
    input =>
      (errors[input.name] = input.validate(this.state.inputs[input.name])),
  )

  const errorValues = Object.values(errors).filter(error => error !== undefined)

  return errorValues.length > 0 ? (this.setState({ errors }), false) : true
}

export default LoginFormContainer
