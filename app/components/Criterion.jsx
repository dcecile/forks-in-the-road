import React from "react"

import Button from "Button"
import CriterionState from "CriterionState"
import EditCriterion from "EditCriterion"

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
        {renderDetail("Full value", criterion.full_value)}
        {renderDetail("Default estimate", criterion.default_estimate)}
      </ul>
      <Button className="Criterion_editButton" onClick={onBeginEdit}>
        Edit
      </Button>
    </div>
  )
}

function renderDetail(text, detail) {
  return detail !== null ? (
    <li>
      {text}: {detail}
    </li>
  ) : null
}

function renderEdit(criterion, onSubmitEdit, onCancelEdit) {
  return (
    <EditCriterion
      criterion={criterion}
      onSubmit={onSubmitEdit}
      onCancel={onCancelEdit}
    />
  )
}
