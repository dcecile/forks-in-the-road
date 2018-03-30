import React from "react"

import Button from "Button"
import EstimateFields from "EstimateFields"
import EstimateInput from "EstimateInput"
import Form from "Form"
import FormState from "FormState"
import SubmitButton from "SubmitButton"

export default FormState.renderWith(render, { fields: EstimateFields })

function render({ input, criterion, fields, onSubmit, onCancel, onReset }) {
  return (
    <Form
      className="EditEstimate"
      onSubmit={() => handleSubmit(input, fields, onSubmit)}
    >
      {renderEstimate(criterion, fields.estimate)}
      {renderButtons(onCancel, onReset)}
    </Form>
  )
}

function renderEstimate(criterion, field) {
  return (
    <EstimateInput
      className="EditEstimate_input"
      required
      defaultEstimate={criterion.default_estimate}
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
        onClick={() => handleCancel(onCancel)}
      >
        Cancel
      </Button>
      <Button
        className="EditEstimate_resetButton"
        onClick={() => handleReset(onReset)}
      >
        Reset
      </Button>
    </div>
  )
}

async function handleSubmit(input, fields, onSubmit) {
  await onSubmit({
    id: input.id,
    estimate: fields.estimate.output()
  })
}

function handleCancel(onCancel) {
  onCancel()
}

function handleReset(onReset) {
  onReset()
}
