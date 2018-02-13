import React from "react"

import Button from "Button"
import EditComparisonState from "EditComparisonState"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function EditComparison(props) {
  return (
    <EditComparisonState
      render={stateProps => render({ ...props, ...stateProps })}
      {...props}
    />
  )
}

function render({
  name,
  alternative_noun,
  value_unit,
  onChangeName,
  onChangeAlternativeNoun,
  onChangeValueUnit,
  onSubmit,
  onCancel
}) {
  return (
    <form
      className="EditComparison"
      onSubmit={event =>
        handleSubmit(event, name, alternative_noun, value_unit, onSubmit)
      }
    >
      {renderName(name, onChangeName)}
      {renderAlternativeNoun(alternative_noun, onChangeAlternativeNoun)}
      {renderValueUnit(value_unit, onChangeValueUnit)}
      {renderButtons(onCancel)}
    </form>
  )
}

function renderName(name, onChangeName) {
  return (
    <label className="EditComparison_label">
      Comparison name:
      <TextInput
        className="EditComparison_input"
        required
        placeholder="Comparison"
        value={name}
        onChange={onChangeName}
      />
    </label>
  )
}

function renderAlternativeNoun(alternative_noun, onChangeAlternativeNoun) {
  return (
    <label className="EditComparison_label">
      Alternative noun (optional):
      <TextInput
        className="EditComparison_input"
        placeholder="alternative"
        value={alternative_noun}
        onChange={onChangeAlternativeNoun}
      />
    </label>
  )
}

function renderValueUnit(value_unit, onChangeValueUnit) {
  return (
    <label className="EditComparison_label">
      Value unit (optional):
      <TextInput
        className="EditComparison_input"
        placeholder="$"
        value={value_unit}
        onChange={onChangeValueUnit}
      />
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

function handleSubmit(event, name, alternative_noun, value_unit, onSubmit) {
  event.preventDefault()
  onSubmit({
    name: name,
    alternative_noun: alternative_noun || null,
    value_unit: value_unit || null
  })
}

function handleCancel(event, onCancel) {
  event.preventDefault()
  onCancel()
}
