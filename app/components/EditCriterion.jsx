import React from "react"

import Button from "Button"
import CriterionFields from "CriterionFields"
import FormState from "FormState"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function EditCriterion(props) {
  const { criterion } = props
  return (
    <FormState
      input={criterion}
      fields={CriterionFields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ criterion, fields, onSubmit, onCancel }) {
  return (
    <form
      className="EditCriterion"
      onSubmit={event => handleSubmit(event, criterion, fields, onSubmit)}
    >
      {renderName(fields.name)}
      {renderDescription(fields.description)}
      {renderFullValue(fields.full_value)}
      {renderDefaultEstimate(fields.default_estimate)}
      {renderButtons(onCancel)}
    </form>
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
      input={NumberInput}
      min="0"
      max="100"
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
        onClick={event => handleCancel(event, onCancel)}
      >
        Cancel
      </Button>
    </div>
  )
}

async function handleSubmit(event, criterion, fields, onSubmit) {
  event.preventDefault()
  await onSubmit({
    id: criterion.id,
    name: fields.name.output(),
    description: fields.description.output(),
    full_value: fields.full_value.output(),
    default_estimate: fields.default_estimate.output()
  })
}

function handleCancel(event, onCancel) {
  event.preventDefault()
  onCancel()
}
