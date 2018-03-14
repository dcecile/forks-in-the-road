import React from "react"

import EstimateFields from "EstimateFields"
import EstimateInput from "EstimateInput"
import Form from "Form"
import FormState from "FormState"
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
    <EstimateInput
      className="NewEstimate_input"
      required
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
