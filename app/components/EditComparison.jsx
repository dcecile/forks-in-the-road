import React from "react"

import Button from "Button"
import FieldType from "FieldType"
import FormState from "FormState"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function EditComparison(props) {
  const { comparison } = props
  const fields = {
    name: FieldType.string,
    alternative_noun: FieldType.nullString,
    value_unit: FieldType.nullString
  }

  return (
    <FormState
      input={comparison}
      fields={fields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ fields, onSubmit, onCancel }) {
  return (
    <form
      className="EditComparison"
      onSubmit={event => handleSubmit(event, fields, onSubmit)}
    >
      {renderName(fields.name)}
      {renderAlternativeNoun(fields.alternative_noun)}
      {renderValueUnit(fields.value_unit)}
      {renderButtons(onCancel)}
    </form>
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
        onClick={event => handleCancel(event, onCancel)}
      >
        Cancel
      </Button>
    </div>
  )
}

async function handleSubmit(event, fields, onSubmit) {
  event.preventDefault()
  await onSubmit({
    name: fields.name.output(),
    alternative_noun: fields.alternative_noun.output(),
    value_unit: fields.value_unit.output()
  })
}

function handleCancel(event, onCancel) {
  event.preventDefault()
  onCancel()
}
