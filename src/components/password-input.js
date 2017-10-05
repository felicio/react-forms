import React from 'react'
import PropTypes from 'prop-types'

import { Label, Input } from './form-input'

class PasswordInput extends React.Component {
  state = {
    type: 'password',
    focused: false,
  }

  handleFocus = event => this.setState({ focused: true })

  handleBlur = event => {
    const { name, value } = event.target

    this.setState({ focused: false })
    this.props.handleBlur(name, value)
  }

  handleMouseDown = event => this.setState({ type: 'text' })

  handleMouseRelease = event => this.setState({ type: 'password' })

  render() {
    const { name, error, failure, handleChange } = this.props
    const { focused } = this.state

    return (
      <div>
        <Label htmlFor={name} focused={focused}>
          {name}:
        </Label>
        <Input
          id={name}
          name={name}
          type={this.state.type}
          focused={focused}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={handleChange}
          valid={!(error || failure)}
          required
        />
        <button
          type="button"
          onMouseDown={this.handleMouseDown}
          onMouseLeave={this.handleMouseRelease} // does not bubble
          onMouseUp={this.handleMouseRelease}>
          Show
        </button>
        {error && <small style={{ color: 'red' }}>{error}</small>}
      </div>
    )
  }
}

PasswordInput.defaultProps = {
  error: '',
  failure: false,
}

PasswordInput.propTypes = {
  error: PropTypes.string,
  failure: PropTypes.bool,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

export default PasswordInput
