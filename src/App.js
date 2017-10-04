import React from 'react'

import LoginFormContainer from './containers/login-form-container'
import EventForm from './components/event-form'

class App extends React.Component {
  render() {
    return (
      <div style={{ padding: '0 10px' }}>
        <LoginFormContainer />
        <EventForm data={{ title: 'Celebration of life', capacity: 7 }} />
      </div>
    )
  }
}

export default App
