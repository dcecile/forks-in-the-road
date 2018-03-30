import React from "react"

import Button from "Button"
import CriterionState from "CriterionState"
import EditCriterion from "EditCriterion"
import { convertPercentToString } from "PercentFormat"

export default CriterionState.renderWith(render)

function render({
  className,
  criterion,
  isEditing,
  isEditStateChanging,
  onBeginEdit,
  onSubmitEdit,
  onCancelEdit
}) {
  const editStateChangingClassName = isEditStateChanging
    ? "Criterion_transform__isEditChangingState"
    : ""

  return (
    <div className={`Criterion ${className}`}>
      <div className={`Criterion_transform ${editStateChangingClassName}`}>
        {!isEditing
          ? renderShow(criterion, onBeginEdit)
          : renderEdit(criterion, onSubmitEdit, onCancelEdit)}
      </div>
    </div>
  )
}

function renderShow(criterion, onBeginEdit) {
  return (
    <div className="Criterion_body">
      <h2 className="Criterion_name">{criterion.name} </h2>
      <p className="Criterion_description">{criterion.description}</p>
      <ul>
        {renderDetail("Full value", criterion.full_value, value => value)}
        {renderDetail(
          "Default estimate",
          criterion.default_estimate,
          convertPercentToString
        )}
      </ul>
      <Button className="Criterion_editButton" onClick={onBeginEdit}>
        Edit
      </Button>
    </div>
  )
}

function renderDetail(text, detail, convert) {
  return detail !== null ? (
    <li>
      {text}: {convert(detail)}
    </li>
  ) : null
}

function renderEdit(criterion, onSubmitEdit, onCancelEdit) {
  return (
    <EditCriterion
      input={criterion}
      onSubmit={onSubmitEdit}
      onCancel={onCancelEdit}
    />
  )
}
