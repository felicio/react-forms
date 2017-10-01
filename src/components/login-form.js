import React from 'react'
import styled, { css } from 'styled-components'

// TODO: On submit validate all with values from container state and returni error object.
export const inputs = [
  {
    type: 'email',
    name: 'email',
    required: true,
  },
  {
    type: 'password',
    name: 'password',
    required: true,
  },
]

export default class LoginForm extends React.Component {
  render() {
    const { onSubmit, errors, ...rest } = this.props
    const formInputs = inputs.map((input, index) => (
      <FormInput
        key={index}
        id={index}
        error={errors[input.name]}
        type={input.type}
        name={input.name}
        required={input.required}
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
    }
  }

  render() {
    const { id, name, error } = this.props

    return (
      <div style={{ marginBottom: '10px' }}>
        <Label htmlFor={id}>{name}:</Label>
        <Input autoComplete="off" {...this.props} />
        {/* TODO: Ovewrite with internal validation. */}
        {error && <small>{error}</small>}
      </div>
    )
  }
}

const Label = styled.label`margin-right: 10px;`

const Input = styled.input`
  width: 200px;
  border: none;
  outline: 0;
  border-bottom: 1px solid lightgrey;
  ${props =>
    ((props.loginFailure && props.required) || props.error) &&
    css`
      border-bottom-color: red;
    `};
`
