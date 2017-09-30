import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const inputs = {
  title: {
    type: 'text',
    name: 'title',
    isRequired: true,
    value: '',
    validator: () => {
      return true
    },
  },
  date: {
    type: 'date',
    name: 'date',
    isRequired: true,
    value: '',
    validator: function isValid() {
      return true
    },
    errorMessage: 'not valid',
  },
  time: {
    type: 'time',
    name: 'time',
    isRequired: false,
    value: '',
    validator: function isValid() {
      return true
      // const { value } = inputs.date
      // if (inputs.date.value === '') {
      //   return true
      // }

      // const date = new Date()
      // return !Number.isNaN(Date.parse(``))
    },
    errorMessage: 'not valid',
  },
}

Object.defineProperty(inputs, 'startsAt', {
  value: function() {
    return new Date(this.date.value + ' ' + this.time.value)
  },
  configurable: false,
  writable: false,
  enumerable: false,
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputs: Object.assign({}, inputs),
    }
  }

  handleChange = event => {
    // Set state.
  }

  handleSubmit = event => {
    event.preventDefault()
    const { inputs } = this.state

    const payload = {
      id: Date.now(),
      title: inputs.title.value,
      startsAt: inputs.startsAt(),
    }

    console.dir(payload)
  }

  render() {
    const { inputs } = this.state
    return (
      <div style={{ padding: '0 10px' }}>
        <h1>Form:</h1>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          {Object.keys(inputs).map((key, index) => (
            <div key={index}>
              <label htmlFor={index}>{inputs[key].name}: </label>
              <FormInput
                id={index}
                type={inputs[key].type}
                name={inputs[key].name}
                onChange={this.handleChange}
                validator={inputs[key].validator}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

class FormInput extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '', isActive: false, isValid: true }
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleBlur = () => {
    this.setState({ isActive: false })

    // If not valid, set state.
    console.log('validate')
    if (!this.props.validator()) {
      this.setState({ isValid: false })
    } else {
      this.setState({ isValid: true })
    }
  }

  render() {
    const { id, type, name, errorMessage } = this.props
    const { isActive, isValid } = this.state

    return (
      <div style={{ display: 'inline-block' }}>
        <Input
          id={id}
          type={type}
          name={name}
          onChange={this.handleChange}
          isActive={isActive}
          isValid={isValid}
          onFocus={() => this.setState({ isActive: true })}
          onBlur={this.handleBlur}
        />
        {!isValid && errorMessage}
      </div>
    )
  }
}

const Input = styled.input`
  outline: 0;
  border: none;
  border-bottom: 1px solid lightgrey;
  margin-bottom: 5px;
  ${props => props.isActive && css`border-bottom-color: black;`};
  ${props => !props.isValid && css`border-bottom-color: red;`};
`

export default App
