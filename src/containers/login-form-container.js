import React from 'react'

import LoginForm, { inputs as loginFormInputs } from '../components/login-form'

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
      loginFailure: false,
    }
  }

  handleChange = (name, value) => {
    this.setState(prevState => ({
      inputs: { ...prevState.inputs, [name]: value },
    }))
  }

  handleSubmit = event => {
    event.preventDefault()

    // TODO: Validate inputs: isValid(templateInputs, inputsFromState).
    const errors = {}

    loginFormInputs.map(input => (errors[input.name] = input.valid()))

    const errorCount = Object.keys(errors).length

    if (errorCount > 0) {
      this.setState({ errors })
    }

    if (errorCount === 0) {
      const { email, password } = this.state.inputs

      const payload = {
        id: Date.now(),
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
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

// TODO: Connect to store.
export default LoginFormContainer
