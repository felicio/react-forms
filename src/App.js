import React from 'react'

import LoginFormContainer from './containers/login-form-container'

export default class App extends React.Component {
  render() {
    return (
      <div style={{ padding: '0 10px' }}>
        <LoginFormContainer />
      </div>
    )
  }
}
