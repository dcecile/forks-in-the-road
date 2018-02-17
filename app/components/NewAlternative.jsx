import MdAdd from "react-icons/lib/md/add"
import React from "react"

import FieldType from "FieldType"
import FormState from "FormState"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function NewAlternative(props) {
  const fields = {
    name: FieldType.string,
    url: FieldType.nullString
  }

  return (
    <FormState
      fields={fields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ className, fields, onSubmit, onReinitForm }) {
  return (
    <form
      className={`NewAlternative ${className}`}
      onSubmit={event => handleSubmit(event, fields, onSubmit, onReinitForm)}
    >
      {renderName(fields.name)}
      {renderURL(fields.url)}
      {renderButton()}
    </form>
  )
}

function renderName({ value, onChange }) {
  return (
    <TextInput
      className="NewAlternative_name"
      required
      placeholder="New alternative name"
      value={value}
      onChange={onChange}
    />
  )
}

function renderURL({ value, onChange }) {
  return (
    <TextInput
      className="NewAlternative_url"
      placeholder="New alternative URL (optional)"
      value={value}
      onChange={onChange}
    />
  )
}

function renderButton() {
  return (
    <SubmitButton className="NewAlternative_submit">
      <MdAdd className="NewAlternative_submitIcon" /> Add
    </SubmitButton>
  )
}

async function handleSubmit(event, fields, onSubmit, onReinitForm) {
  event.preventDefault()
  await onSubmit({
    name: fields.name.output(),
    url: fields.url.output()
  })
  onReinitForm()
}
