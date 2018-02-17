import MdLibraryAdd from "react-icons/lib/md/library-add"
import React from "react"

import FieldType from "FieldType"
import FormState from "FormState"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function NewComparison(props) {
  const fields = {
    name: FieldType.string
  }

  return (
    <FormState
      fields={fields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ className, fields, onSubmit }) {
  return (
    <form
      className={`NewComparison ${className}`}
      onSubmit={event => handleSubmit(event, fields, onSubmit)}
    >
      {renderName(fields.name)}
      {renderButton()}
    </form>
  )
}

function renderName({ value, onChange }) {
  return (
    <TextInput
      className="NewComparison_input"
      type="text"
      required
      placeholder="New comparison"
      value={value}
      onChange={onChange}
    />
  )
}

function renderButton() {
  return (
    <SubmitButton className="NewComparison_button">
      <MdLibraryAdd /> Create
    </SubmitButton>
  )
}

async function handleSubmit(event, fields, onSubmit) {
  event.preventDefault()
  await onSubmit({
    name: fields.name.output()
  })
}
