import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { prop, map } from 'ramda'

import Input from '../components/input'
// TODO: Define function helpers.
import { getNewFieldValue, getInitialFormState, isFormValid } from './helpers'


const withForm = fieldDefinitions => Component => class extends PureComponent {
  static propTypes = {
    formData: PropTypes.object,
  }

  constructor(props) {
    super(props)
    // console.info('initializing form with this data:', props.formData)
    const definitions = typeof fieldDefinitions === 'function' ? fieldDefinitions(props) : fieldDefinitions
    this.state =
      getInitialFormState(definitions, props.formData, this.onChange)
  }

  renderField = name => {
    const data = this.state[name]
    if (!data) {
      throw new Error('missing field definition for', name)
    }

    return  <Input {...data} />
  }

  onChange = name => value =>
    this.setState({ [name]: getNewFieldValue(this.state[name], value) })

  serialize = cb => {
    const serialized = map(prop('value'), this.state)
    if (isFormValid(this.state)) {
      return cb(serialized)
    }

    // set pristine to false for every field, which will result in showing error on invalid fields
    return this.setState(
      map(x => ({ ...x, pristine: false }), this.state))
  }

  render() {
    // console.warn('form internal state')
    // console.table(this.state)
    // console.warn('form overall state, valid: ', isFormValid(this.state))

    return (
      <Component
        {...this.props}
        renderField={this.renderField}
        serialize={this.serialize}
        isValid={isFormValid(this.state)}
      />
    )
  }
}

export default withForm
