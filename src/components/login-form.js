import React from 'react'
import styled, { css } from 'styled-components'

// TODO: On submit validate all with values from container state and return error object.
export const inputs = [
  {
    type: 'email',
    name: 'email',
    required: true,
    valid() {
      return `${this.name} is not valid`
    },
  },
  {
    type: 'password',
    name: 'password',
    required: true,
    valid() {
      return `${this.name} is not valid`
    },
  },
]

export default class LoginForm extends React.Component {
  render() {
    const { onChange, onSubmit, errors, ...rest } = this.props
    const formInputs = inputs.map((input, index) => (
      <FormInput
        key={index}
        id={index}
        error={errors[input.name]}
        type={input.type}
        name={input.name}
        required={input.required}
        onChange={onChange}
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

  handleBlur = event => {
    const { name, value } = event.target

    this.setState({ focused: false })
    this.props.onChange(name, value)
  }

  render() {
    const { id, type, name, error, required, loginFailure } = this.props
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
        {/* TODO: Ovewrite with internal validation. */}
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
