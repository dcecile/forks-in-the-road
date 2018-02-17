import React from "react"

import FieldType from "FieldType"
import FormState from "FormState"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"

export default function NewEstimate(props) {
  const fields = {
    estimate: FieldType.floatPercent
  }

  return (
    <FormState
      fields={fields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ criterion, fields, onSubmit }) {
  return (
    <form
      className="NewEstimate"
      onSubmit={event => handleSubmit(event, criterion, fields, onSubmit)}
    >
      {renderEstimate(criterion, fields.estimate)}
      {renderButton()}
    </form>
  )
}

function renderEstimate(criterion, field) {
  return (
    <NumberInput
      className="NewEstimate_input"
      required
      min="0"
      max="100"
      placeholder={`Estimate: ${criterion.default_estimate}`}
      field={field}
    />
  )
}

function renderButton() {
  return <SubmitButton className="NewEstimate_button">Save</SubmitButton>
}

async function handleSubmit(event, criterion, fields, onSubmit) {
  event.preventDefault()
  await onSubmit({
    criterion_id: criterion.id,
    estimate: fields.estimate.output()
  })
}
