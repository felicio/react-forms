import React from 'react'
import styled, { css } from 'styled-components'

import { emailIsValid, valueIsEmpty } from '../utils/validators'

// TODO: Move inputs somewhere else.
export const inputs = [
  {
    type: 'email',
    name: 'email',
    required: true,
    validate(value) {
      if (valueIsEmpty(value) && this.required) {
        return `${this.name} is required`
      }

      if (!emailIsValid(value)) {
        return `${this.name} is not valid`
      }
    },
  },
  {
    type: 'password',
    name: 'password',
    required: true,
    validate(value) {
      if (valueIsEmpty(value) && this.required) {
        return `${this.name} is required`
      }
    },
  },
]

export default class LoginForm extends React.Component {
  render() {
    // FIXME: Delete ...rest.
    const { onChange, onError, onSubmit, errors, ...rest } = this.props
    const formInputs = inputs.map((input, index) => (
      <FormInput
        key={index}
        id={index}
        error={errors[input.name]}
        type={input.type}
        name={input.name}
        required={input.required}
        onChange={onChange}
        onError={onError}
        validate={input.validate}
        {...rest}
      />
    ))

    return (
      <form onSubmit={onSubmit} noValidate autoComplete="off">
        {formInputs}
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export class FormInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      focused: false,
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  // FIXME: Pressing return key does not trigger onblur event.
  handleBlur = event => {
    const { name, value } = event.target
    const { onError, onChange } = this.props

    onError(name, this.props.validate(value)) // validate is bound to props object
    onChange(name, value)
    this.setState({ focused: false })
  }

  render() {
    // TODO: Rename loginFailure prop to isFormValid.
    const { id, type, name, required, loginFailure, error } = this.props
    const { value, focused } = this.state

    return (
      <div style={{ marginBottom: '10px' }}>
        <Label htmlFor={id} focused={focused} filled={value !== ''}>
          {name}:
        </Label>
        <Input
          id={id}
          type={type}
          name={name}
          required={required}
          autoComplete="off"
          focused={focused}
          valid={!((loginFailure && required) || error)}
          onChange={this.handleChange}
          onFocus={() => this.setState({ focused: true })}
          onBlur={this.handleBlur}
        />
        {error && <small style={{ color: 'red' }}>{error}</small>}
      </div>
    )
  }
}

const Label = styled.label`
  margin-right: 10px;
  ${props => (props.focused || props.filled) && css`font-weight: bolder;`};
`

const Input = styled.input`
  width: 200px;
  border: none;
  outline: 0;
  border-bottom: 1px solid lightgrey;
  ${props => !props.valid && css`border-bottom-color: red;`};
  ${props => props.focused && css`border-bottom-color: black;`};
`
