import React from "react"

import Button from "Button"
import EditEstimate from "EditEstimate"
import EstimateState from "EstimateState"
import NewEstimate from "NewEstimate"
import { calculateEstimateValue } from "ValueCalculation"
import { convertPercentToString } from "PercentFormat"
import { convertValueToString } from "ValueFormat"
import { defaultValueUnitIfNull } from "ComparisonFields"
import { unknownEstimateIfNull } from "EstimateFields"

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
  const editStateChangingClassName = isEditStateChanging
    ? "Estimate_body__isEditChangingState"
    : ""

  return (
    <div className={`Estimate ${className}`}>
      <div className={`Estimate_body ${editStateChangingClassName}`}>
        <h2 className="Estimate_name">{criterion.name}</h2>
        {!isEditing
          ? renderShow(estimate, criterion, valueUnit, onBeginEdit)
          : renderEdit(
              estimate,
              criterion,
              onSubmitNew,
              onSubmitEdit,
              onCancelEdit,
              onSubmitReset
            )}
      </div>
    </div>
  )
}

function renderShow(estimate, criterion, valueUnit, onBeginEdit) {
  const isNew = !estimate
  const fullValueString = convertValueToString(
    defaultValueUnitIfNull(valueUnit),
    criterion.full_value
  )
  const expectedValueString = convertValueToString(
    defaultValueUnitIfNull(valueUnit),
    calculateEstimateValue(estimate, criterion)
  )

  return (
    <React.Fragment>
      <div className="Estimate_fullValue">Full value: {fullValueString}</div>
      {isNew ? (
        <div className="Estimate_defaultEstimate">
          Default estimate:{" "}
          {convertPercentToString(
            unknownEstimateIfNull(criterion.default_estimate)
          )}
        </div>
      ) : (
        <div className="Estimate_estimate">
          Estimate: {convertPercentToString(estimate.estimate)}
        </div>
      )}
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
  onSubmitNew,
  onSubmitEdit,
  onCancelEdit,
  onSubmitReset
) {
  const isNew = !estimate

  if (isNew) {
    return <NewEstimate criterion={criterion} onSubmit={onSubmitNew} />
  } else {
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
}
