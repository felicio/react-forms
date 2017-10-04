import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

export default class FormInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      focused: false,
    }
  }

  render() {
    const { name, type, required, defaultValue } = this.props
    const { focused } = this.state

    return (
      <div style={{ marginBottom: '10px' }}>
        <Label htmlFor={name} focused={focused}>
          {name}:
        </Label>
        <Input
          id={name}
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          focused={focused}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
          autoComplete="off"
        />
      </div>
    )
  }
}

FormInput.propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
}

const Label = styled.label`
  margin-right: 10px;
  ${props => props.focused && css`font-weight: bolder;`};
`

const Input = styled.input`
  width: 200px;
  border: none;
  outline: 0;
  border-bottom: 1px solid lightgrey;
  ${props => props.focused && css`border-bottom-color: black;`};
`
