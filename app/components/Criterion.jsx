import React from "react"

import Button from "Button"
import CriterionState from "CriterionState"
import EditCriterion from "EditCriterion"
import { convertPercentToString } from "PercentFormat"
import { convertValueToString } from "ValueFormat"
import { defaultValueUnitIfNull } from "ComparisonFields"

export default CriterionState.renderWith(render)

function render({
  className,
  criterion,
  valueUnit,
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
          ? renderShow(criterion, valueUnit, onBeginEdit)
          : renderEdit(criterion, valueUnit, onSubmitEdit, onCancelEdit)}
      </div>
    </div>
  )
}

function renderShow(criterion, valueUnit, onBeginEdit) {
  return (
    <div className="Criterion_body">
      <h2 className="Criterion_name">{criterion.name} </h2>
      <p className="Criterion_description">{criterion.description}</p>
      <ul>
        {renderDetail("Full value", criterion.full_value, value =>
          convertValueToString(defaultValueUnitIfNull(valueUnit), value)
        )}
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

function renderEdit(criterion, valueUnit, onSubmitEdit, onCancelEdit) {
  return (
    <EditCriterion
      input={criterion}
      valueUnit={valueUnit}
      onSubmit={onSubmitEdit}
      onCancel={onCancelEdit}
    />
  )
}
