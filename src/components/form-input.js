import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState } from 'recompose'
import styled, { css } from 'styled-components'

const FormInput = ({
  name,
  type,
  required,
  failure,
  defaultValue,
  focused,
  setFocused,
  handleChange,
}) => (
  <Wrapper>
    <Label htmlFor={name} focused={focused}>
      {name}:
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      failure={failure}
      required={required}
      defaultValue={defaultValue}
      focused={focused}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={handleChange}
    />
  </Wrapper>
)

FormInput.defaultProps = {
  required: false,
  failure: false,
}

FormInput.propTypes = {
  defaultValue: PropTypes.any,
  failure: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
}

export const Label = styled.label`
  ${props => props.focused && css`font-weight: bolder;`};
`

export const Input = styled.input.attrs({
  autoComplete: 'off', // static prop
})`
  width: 200px;
  height: 25px;
  outline: 0;
  border: none;
  border-bottom: 1px solid lightgrey;
  padding: 0 10px;
  ${props => props.failure && css`border-bottom-color: red;`};
  ${props => props.focused && css`border-bottom-color: black;`};
`

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`

export default compose(withState('focused', 'setFocused', false))(FormInput)
