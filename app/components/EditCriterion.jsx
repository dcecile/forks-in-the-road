import React from "react"

import Button from "Button"
import CriterionFields from "CriterionFields"
import EstimateInput from "EstimateInput"
import Form from "Form"
import FormState from "FormState"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default FormState.renderWith(render, { fields: CriterionFields })

function render({ input, fields, onSubmit, onCancel }) {
  return (
    <Form
      className="EditCriterion"
      onSubmit={() => handleSubmit(input, fields, onSubmit)}
    >
      {renderName(fields.name)}
      {renderDescription(fields.description)}
      {renderFullValue(fields.full_value)}
      {renderDefaultEstimate(fields.default_estimate)}
      {renderButtons(onCancel)}
    </Form>
  )
}

function renderName(field) {
  return (
    <CustomLabeledInput
      field={field}
      labelText="Criterion name"
      input={TextInput}
      required
      placeholder="Criterion"
    />
  )
}

function renderDescription(field) {
  return (
    <CustomLabeledInput
      field={field}
      labelText="Description (optional)"
      input={TextInput}
      placeholder="Why this criterion is important"
    />
  )
}

function renderFullValue(field) {
  return (
    <CustomLabeledInput
      field={field}
      labelText="Full value"
      input={NumberInput}
      required
      placeholder="1000"
    />
  )
}

function renderDefaultEstimate(field) {
  return (
    <CustomLabeledInput
      field={field}
      labelText="Default estimate (optional)"
      input={EstimateInput}
      placeholder="50"
    />
  )
}

function CustomLabeledInput({ field, labelText, input, ...props }) {
  const Input = input
  return (
    <label className="EditCriterion_label">
      {labelText}:
      <Input className="EditCriterion_input" field={field} {...props} />
    </label>
  )
}

function renderButtons(onCancel) {
  return (
    <div className="EditCriterion_buttonGroup">
      <SubmitButton className="EditCriterion_button">Save</SubmitButton>
      <Button
        className="EditCriterion_button"
        onClick={() => handleCancel(onCancel)}
      >
        Cancel
      </Button>
    </div>
  )
}

async function handleSubmit(input, fields, onSubmit) {
  await onSubmit({
    id: input.id,
    name: fields.name.output(),
    description: fields.description.output(),
    full_value: fields.full_value.output(),
    default_estimate: fields.default_estimate.output()
  })
}

function handleCancel(onCancel) {
  onCancel()
}
