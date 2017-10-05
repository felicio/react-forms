import React from 'react'
import PropTypes from 'prop-types'

import { Label, Input } from './form-input'

class PasswordInput extends React.Component {
  state = {
    type: 'password',
    focused: false,
  }

  handleFocus = event => this.setState({ focused: true })

  handleBlur = event => this.setState({ focused: false })

  handleMouseDown = event => this.setState({ type: 'text' })

  handleMouseRelease = event => this.setState({ type: 'password' })

  render() {
    const { name, failure, handleChange } = this.props
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
          failure={failure}
          required
        />
        <button
          type="button"
          onMouseDown={this.handleMouseDown}
          onMouseLeave={this.handleMouseRelease} // does not bubble
          onMouseUp={this.handleMouseRelease}>
          Show
        </button>
      </div>
    )
  }
}

PasswordInput.defaultProps = {
  failure: false,
}

PasswordInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  failure: PropTypes.bool,
}

export default PasswordInput
