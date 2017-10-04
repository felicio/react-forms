import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import styled, { css } from 'styled-components'

const FormInput = ({
  name,
  type,
  required,
  defaultValue,
  focused,
  setFocused,
}) => (
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
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      autoComplete="off"
    />
  </div>
)

FormInput.propTypes = {
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
}

export default compose(withState('focused', 'setFocused', false))(FormInput)

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
