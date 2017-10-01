import React from 'react'

import LoginForm from '../components/login-form'

class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputs: {},
      errors: {},
      loginFailure: false,
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    // TODO: Validate inputs.
    const errors = {
      email: 'not valid',
      password: 'not valid',
    }

    this.setState({ errors })

    if (Object.keys(errors) === 0) {
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
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

// TODO: Connect to store.
export default LoginFormContainer
