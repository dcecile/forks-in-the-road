import MdLibraryAdd from "react-icons/lib/md/library-add"
import React from "react"

import ComparisonFields from "ComparisonFields"
import Form from "Form"
import FormState from "FormState"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default function NewComparison(props) {
  return (
    <FormState
      fields={ComparisonFields}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({ className, fields, onSubmit }) {
  return (
    <Form
      className={`NewComparison ${className}`}
      onSubmit={() => handleSubmit(fields, onSubmit)}
    >
      {renderName(fields.name)}
      {renderButton()}
    </Form>
  )
}

function renderName(field) {
  return (
    <TextInput
      className="NewComparison_input"
      type="text"
      required
      placeholder="New comparison"
      field={field}
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

async function handleSubmit(fields, onSubmit) {
  await onSubmit({
    name: fields.name.output()
  })
}
