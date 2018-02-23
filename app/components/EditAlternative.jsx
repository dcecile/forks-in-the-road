import React from "react"

import AlternativeFields from "AlternativeFields"
import Button from "Button"
import FormState from "FormState"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function EditAlternative(props) {
  const { alternative } = props
  return (
    <FormState
      input={alternative}
      fields={AlternativeFields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ className, alternative, fields, onSubmit, onCancel }) {
  return (
    <form
      className={`EditAlternative ${className}`}
      onSubmit={event => handleSubmit(event, alternative, fields, onSubmit)}
    >
      <div className="EditAlternative_row">
        {renderName(fields.name)}
        {renderURL(fields.url)}
      </div>
      <div className="EditAlternative_buttonRow">{renderButtons(onCancel)}</div>
    </form>
  )
}

function renderName(field) {
  return (
    <TextInput
      className="EditAlternative_name"
      required
      placeholder="Alternative name"
      field={field}
    />
  )
}

function renderURL(field) {
  return (
    <TextInput
      className="EditAlternative_url"
      type="text"
      placeholder="Alternative URL (optional)"
      field={field}
    />
  )
}

function renderButtons(onCancel) {
  return (
    <React.Fragment>
      <SubmitButton className="EditAlternative_submit">Save</SubmitButton>
      <Button
        className="EditAlternative_cancel"
        onClick={event => handleCancel(event, onCancel)}
      >
        Cancel
      </Button>
    </React.Fragment>
  )
}

async function handleSubmit(event, alternative, fields, onSubmit) {
  event.preventDefault()
  await onSubmit({
    id: alternative.id,
    name: fields.name.output(),
    url: fields.url.output()
  })
}

function handleCancel(event, onCancel) {
  event.preventDefault()
  onCancel()
}
