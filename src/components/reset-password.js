import React from 'react'
// import { connect } from 'react-redux'
import { compose, withHandlers, withState, pure } from 'recompose'

// import { resetPassword } from 'data/app/actions'

import withForm from '../hocs/with-form'
import { formDefinition } from './login-form'

const ResetPassword = ({ handleSubmit, renderField, sending, sent, close }) => (
  <div>
    <h1>Forgot your password?</h1>
    <p>Please enter your email address and we'll send you an email with a link to reset your password.</p>
    <form onSubmit={handleSubmit} autoComplete="off">
      {renderField('email')}
      <button>{sent ? 'Sent!': 'Reset password'}</button>
      <button onClick={close}>Log in</button>
    </form>
  </div>
)

const mapDispatchToProps = {
  // resetPassword,
}

export default compose(
  pure,
  // connect(null, mapDispatchToProps),
  withForm(formDefinition),
  withState('sent', 'setSent', false),
  withState('sending', 'setSending', false),
  withHandlers({
    handleSubmit: props => e => {
      e.preventDefault()
      // serialize form
      props.serialize(data => {
        // upon successfull submission, set appropriate flags and dipsatch reset password with callback
        props.setSending(true)
        props.resetPassword(data.email, () => {
          props.setSending(false)
          props.setSent(true)
          setTimeout(props.close, 3000)
        }, () => props.setSending(false))
      })
    },
  }),
)(ResetPassword)
