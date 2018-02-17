import React from "react"

import Button from "Button"
import FieldType from "FieldType"
import FormState from "FormState"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"

export default function EditComparison(props) {
  const { estimate } = props
  const fields = {
    estimate: FieldType.floatPercent
  }

  return (
    <FormState
      input={estimate}
      fields={fields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ estimate, criterion, fields, onSubmit, onCancel, onReset }) {
  return (
    <form
      className="EditEstimate"
      onSubmit={event => handleSubmit(event, estimate, fields, onSubmit)}
    >
      {renderEstimate(criterion, fields.estimate)}
      {renderButtons(onCancel, onReset)}
    </form>
  )
}

function renderEstimate(criterion, field) {
  return (
    <NumberInput
      className="EditEstimate_input"
      required
      min="0"
      max="100"
      placeholder={`Estimate: ${criterion.default_estimate}`}
      field={field}
    />
  )
}

function renderButtons(onCancel, onReset) {
  return (
    <div className="EditEstimate_buttonGroup">
      <SubmitButton className="EditEstimate_button">Save</SubmitButton>
      <Button
        className="EditEstimate_button"
        onClick={event => handleCancel(event, onCancel)}
      >
        Cancel
      </Button>
      <Button
        className="EditEstimate_resetButton"
        onClick={event => handleReset(event, onReset)}
      >
        Reset
      </Button>
    </div>
  )
}

async function handleSubmit(event, estimate, fields, onSubmit) {
  event.preventDefault()
  await onSubmit({
    id: estimate.id,
    estimate: fields.estimate.output()
  })
}

function handleCancel(event, onCancel) {
  event.preventDefault()
  onCancel()
}

function handleReset(event, onReset) {
  event.preventDefault()
  onReset()
}
