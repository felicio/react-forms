import React from 'react'
import styled, { css } from 'styled-components'

const inputs = [
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
    const { onSubmit, ...rest } = this.props
    const formInputs = inputs.map((input, index) => (
      <FormInput
        key={index}
        id={index}
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
  render() {
    const { id, name } = this.props

    return (
      <div style={{ marginBottom: '10px' }}>
        <Label htmlFor={id}>{name}:</Label>
        <Input autoComplete="off" {...this.props} />
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
    props.loginFailure && props.required && css`border-bottom-color: red;`};
`
