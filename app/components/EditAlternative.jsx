import React from "react"

import AlternativeFields from "AlternativeFields"
import Button from "Button"
import Form from "Form"
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
    <Form
      className={`EditAlternative ${className}`}
      onSubmit={() => handleSubmit(alternative, fields, onSubmit)}
    >
      <div className="EditAlternative_row">
        {renderName(fields.name)}
        {renderURL(fields.url)}
      </div>
      <div className="EditAlternative_buttonRow">{renderButtons(onCancel)}</div>
    </Form>
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
        onClick={() => handleCancel(onCancel)}
      >
        Cancel
      </Button>
    </React.Fragment>
  )
}

async function handleSubmit(alternative, fields, onSubmit) {
  await onSubmit({
    id: alternative.id,
    name: fields.name.output(),
    url: fields.url.output()
  })
}

function handleCancel(onCancel) {
  onCancel()
}
