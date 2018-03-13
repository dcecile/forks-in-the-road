import React from "react"

import EstimateFields from "EstimateFields"
import Form from "Form"
import FormState from "FormState"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"

export default FormState.renderWith(render, { fields: EstimateFields })

function render({ criterion, fields, onSubmit }) {
  return (
    <Form
      className="NewEstimate"
      onSubmit={() => handleSubmit(criterion, fields, onSubmit)}
    >
      {renderEstimate(criterion, fields.estimate)}
      {renderButton()}
    </Form>
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

async function handleSubmit(criterion, fields, onSubmit) {
  await onSubmit({
    criterion_id: criterion.id,
    estimate: fields.estimate.output()
  })
}
