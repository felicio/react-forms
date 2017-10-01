import React from 'react'

import LoginForm, { inputs as loginFormInputs } from '../components/login-form'

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
      // Received prop from a store.
      loginFailure: false,
    }
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

    const errors = {}

    // FIXME: Choose different interator.
    loginFormInputs.map(
      input =>
        (errors[input.name] = input.valide(this.state.inputs[input.name])),
    )

    const errorCount = Object.values(errors).filter(error => error).length

    if (errorCount > 0) {
      console.log('errors:', errors)
      this.setState({ errors })
    }

    if (errorCount === 0) {
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
        <h1>Login form</h1>
        {loginFailure && <span style={{ color: 'red' }}>Error</span>}
        <LoginForm
          loginFailure={loginFailure}
          errors={errors}
          onChange={this.handleChange}
          onError={this.handleError}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default LoginFormContainer
