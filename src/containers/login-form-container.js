import React from 'react'

import LoginForm, { inputs as formInputs } from '../components/login-form'

// TODO: Handle change, validation and submitting in form's HoC.
class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
      failure: false, // Received prop from a store.
    }
    this.formIsValid = formIsValid.bind(this)
  }

  handleChange = event => {
    const { name, value } = event.target

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
    const { failure, errors } = this.state

    return (
      <div>
        <h1>Login</h1>
        {failure && (
          <small style={{ color: 'red' }}>
            Incorrect email or password.
          </small>
        )}
        <LoginForm
          failure={failure}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
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
