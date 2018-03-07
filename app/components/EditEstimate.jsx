import React from "react"

import Button from "Button"
import EstimateFields from "EstimateFields"
import Form from "Form"
import FormState from "FormState"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"

export default function EditComparison(props) {
  const { estimate } = props
  return (
    <FormState
      input={estimate}
      fields={EstimateFields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ estimate, criterion, fields, onSubmit, onCancel, onReset }) {
  return (
    <Form
      className="EditEstimate"
      onSubmit={() => handleSubmit(estimate, fields, onSubmit)}
    >
      {renderEstimate(criterion, fields.estimate)}
      {renderButtons(onCancel, onReset)}
    </Form>
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

async function handleSubmit(estimate, fields, onSubmit) {
  await onSubmit({
    id: estimate.id,
    estimate: fields.estimate.output()
  })
}

function handleCancel(onCancel) {
  onCancel()
}

function handleReset(onReset) {
  onReset()
}
