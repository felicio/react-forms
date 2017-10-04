import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import FormInput from '../components/form-input'

const withDefinition = (inputDefinitions, initializeInputs) => WrappedComponent =>
  class extends PureComponent {
    static defaultProps = {
      data: {},
    }

    static propTypes = {
      data: PropTypes.object,
    }

    constructor(props) {
      super(props)

      this.state = {
        inputs: initializeInputs(inputDefinitions, props.data),
      }
    }

    renderInput = inputName => {
      const input = this.state.inputs[inputName]
      const { name, type, required, value } = input

      return (
        <FormInput
          id={name}
          name={name}
          type={type}
          required={required}
          defaultValue={value}
        />
      )
    }

    render() {
      return <WrappedComponent {...this.props} renderInput={this.renderInput} />
    }
  }

export default withDefinition
