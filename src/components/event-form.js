import React from 'react'
import PropTypes from 'prop-types'

import withDefinition from '../hocs/with-definition'

const inputDefinitions = [
  {
    name: 'title', // used as label too
    type: 'text',
    required: true,
  },
  {
    name: 'date',
    type: 'text',
    required: true,
  },
  {
    name: 'time',
    type: 'text',
    required: true,
  },
  {
    name: 'capacity',
    type: 'text',
    required: true,
  },
]

const EventForm = ({ renderInput, handleSubmit }) => (
  <div>
    <h1>Edit event</h1>
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      {/* TODO: Render inputs as an array or selectively. */}
      {renderInput('title')}
      {renderInput('date')}
      {renderInput('time')}
      {renderInput('capacity')}
      <button type="submit">Done</button>
    </form>
  </div>
)

EventForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  renderInput: PropTypes.func.isRequired,
}

// TODO: Serialize data
/** Return object initilized for named input objects (definitions) from a specified data set. */
const initializeInputs = (definitions, data, handler) => {
  const inputs = {}

  definitions.forEach(definition => {
    const name = definition.name

    inputs[name] = {
      ...definition,
      value: data[name] || '',
    }
  })

  return inputs
}

export default withDefinition(inputDefinitions, initializeInputs)(EventForm)
