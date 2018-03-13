import React from "react"

import Button from "Button"
import ComparisonFields from "ComparisonFields"
import Form from "Form"
import FormState from "FormState"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function EditComparison(props) {
  const { input } = props
  return (
    <FormState
      input={input}
      fields={ComparisonFields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ fields, onSubmit, onCancel }) {
  return (
    <Form
      className="EditComparison"
      onSubmit={() => handleSubmit(fields, onSubmit)}
    >
      {renderName(fields.name)}
      {renderAlternativeNoun(fields.alternative_noun)}
      {renderValueUnit(fields.value_unit)}
      {renderButtons(onCancel)}
    </Form>
  )
}

function renderName(field) {
  return (
    <CustomLabeledTextInput
      field={field}
      labelText="Comparison name"
      required
      placeholder="Comparison"
    />
  )
}

function renderAlternativeNoun(field) {
  return (
    <CustomLabeledTextInput
      field={field}
      labelText="Alternative noun (optional)"
      placeholder="alternative"
    />
  )
}

function renderValueUnit(field) {
  return (
    <CustomLabeledTextInput
      field={field}
      labelText="Value unit (optional)"
      placeholder="$"
    />
  )
}

function CustomLabeledTextInput({ field, labelText, ...props }) {
  return (
    <label className="EditComparison_label">
      {labelText}:
      <TextInput className="EditComparison_input" field={field} {...props} />
    </label>
  )
}

function renderButtons(onCancel) {
  return (
    <div className="EditComparison_buttonGroup">
      <SubmitButton className="EditComparison_button">Save</SubmitButton>
      <Button
        className="EditComparison_button"
        onClick={() => handleCancel(onCancel)}
      >
        Cancel
      </Button>
    </div>
  )
}

async function handleSubmit(fields, onSubmit) {
  await onSubmit({
    name: fields.name.output(),
    alternative_noun: fields.alternative_noun.output(),
    value_unit: fields.value_unit.output()
  })
}

function handleCancel(onCancel) {
  onCancel()
}
