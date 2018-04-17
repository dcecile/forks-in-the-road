import React from "react"

import Button from "Button"
import EditEstimate from "EditEstimate"
import EstimateState from "EstimateState"
import NewEstimate from "NewEstimate"
import { calculateEstimateValue } from "ValueCalculation"
import { convertPercentToString } from "PercentFormat"
import { convertValueToString } from "ValueFormat"
import { defaultValueUnitIfNull } from "ComparisonFields"

export default EstimateState.renderWith(render)

function render({
  className,
  estimate,
  criterion,
  valueUnit,
  isEditing,
  isEditStateChanging,
  onSubmitNew,
  onBeginEdit,
  onSubmitEdit,
  onCancelEdit,
  onSubmitReset
}) {
  const isNew = !estimate

  const editStateChangingClassName = isEditStateChanging
    ? "Estimate_body__isEditChangingState"
    : ""

  return (
    <div className={`Estimate ${className}`}>
      <div className={`Estimate_body ${editStateChangingClassName}`}>
        <h2 className="Estimate_name">{criterion.name}</h2>
        {isNew
          ? renderNew(criterion, onSubmitNew)
          : !isEditing
            ? renderShow(estimate, criterion, valueUnit, onBeginEdit)
            : renderEdit(
                estimate,
                criterion,
                onSubmitEdit,
                onCancelEdit,
                onSubmitReset
              )}
      </div>
    </div>
  )
}

function renderNew(criterion, onSubmitNew) {
  return <NewEstimate criterion={criterion} onSubmit={onSubmitNew} />
}

function renderShow(estimate, criterion, valueUnit, onBeginEdit) {
  const fullValueString = convertValueToString(
    defaultValueUnitIfNull(valueUnit),
    criterion.full_value
  )
  const estimateString = convertPercentToString(estimate.estimate)
  const expectedValueString = convertValueToString(
    defaultValueUnitIfNull(valueUnit),
    calculateEstimateValue(estimate, criterion)
  )

  return (
    <React.Fragment>
      <div className="Estimate_fullValue">Full value: {fullValueString}</div>
      <div className="Estimate_estimate">Estimate: {estimateString}</div>
      <div className="Estimate_expectedValue">
        Expected value: {expectedValueString}
      </div>
      <Button className="Estimate_editButton" onClick={onBeginEdit}>
        Edit
      </Button>
    </React.Fragment>
  )
}

function renderEdit(
  estimate,
  criterion,
  onSubmitEdit,
  onCancelEdit,
  onSubmitReset
) {
  return (
    <EditEstimate
      input={estimate}
      criterion={criterion}
      onSubmit={onSubmitEdit}
      onCancel={onCancelEdit}
      onReset={onSubmitReset}
    />
  )
}
