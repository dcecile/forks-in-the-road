import MdAdd from "react-icons/lib/md/add"
import React from "react"

import CriterionFields from "CriterionFields"
import Form from "Form"
import FormState from "FormState"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default FormState.renderWith(render, { fields: CriterionFields })

function render({ className, fields, onFormRef, onSubmit, onReinitForm }) {
  return (
    <Form
      className={`NewCriterion ${className}`}
      onRef={onFormRef}
      onSubmit={() => handleSubmit(fields, onSubmit, onReinitForm)}
    >
      {renderName(fields.name)}
      {renderFullValue(fields.full_value)}
      {renderButton()}
    </Form>
  )
}

function renderName(field) {
  return (
    <TextInput
      className="NewCriterion_name"
      required
      placeholder="New criterion name"
      field={field}
    />
  )
}

function renderFullValue(field) {
  return (
    <NumberInput
      className="NewCriterion_fullValue"
      required
      placeholder="New criterion full value"
      field={field}
    />
  )
}

function renderButton() {
  return (
    <SubmitButton className="NewCriterion_submit">
      <MdAdd className="NewCriterion_submitIcon" /> Add
    </SubmitButton>
  )
}

async function handleSubmit(fields, onSubmit, onReinitForm) {
  await onSubmit({
    name: fields.name.output(),
    full_value: fields.full_value.output()
  })
  onReinitForm()
}
