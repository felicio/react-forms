import React from 'react'

import { emailIsValid, isEmpty } from '../utils/validators'

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
  }

  hasErrors = () => {
    const { errors } = this.state

    return Object.values(errors).filter(error => error).length
  }

  isFilled = () => {
    const { inputs } = this.state

    return Object.values(inputs).filter(value => value).length === 2
  }

  isValid = () => {
    const { email, password } = this.state.inputs
    let errors = {}

    if (!emailIsValid(email)) {
      errors['email'] = 'not valid'
    }

    if (false) {
      errors['password'] = 'not valid'
    }

    // FIXME: Address previous state of errors.
    return Object.keys(errors).length > 0
      ? (this.setState({ errors }), false)
      : true
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState(prevState => ({
      inputs: { ...prevState.inputs, [name]: value },
    }))
  }

  handleBlur = (name, value) => {
    let error = { [name]: '' }

    switch (name) {
      case 'email':
        if (isEmpty(value) || !emailIsValid(value)) {
          error[name] = 'not valid'
        }
        break
      case 'password':
        if (isEmpty(value)) {
          error[name] = 'not valid'
        }
      default:
        break
    }

    this.setState(prevState => ({
      errors: { ...prevState.errors, ...error },
    }))
  }

  handleSubmit = event => {
    event.preventDefault()

    if (this.isValid()) {
      const { email, password } = this.state.inputs

      const payload = {
        email,
        password,
      }

      console.dir(payload)
    }
  }

  render() {
    const { failure, errors, inputs } = this.state

    return (
      <div>
        <h1>Login</h1>
        {failure && (
          <small style={{ color: 'red' }}>Incorrect email or password.</small>
        )}
        <LoginForm
          errors={errors}
          failure={failure}
          filled={this.isFilled() && !this.hasErrors()}
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default LoginFormContainer
