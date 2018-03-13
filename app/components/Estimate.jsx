import React from "react"

import Button from "Button"
import EditEstimate from "EditEstimate"
import EstimateState from "EstimateState"
import NewEstimate from "NewEstimate"

export default EstimateState.renderWith(render)

function render({
  className,
  estimate,
  criterion,
  isEditing,
  isEditStateChanging,
  onSubmitNew,
  onBeginEdit,
  onSubmitEdit,
  onCancelEdit,
  onSubmitReset
}) {
  const isNew = !estimate

  const isEditingClassName = isEditing ? "Estimate__isEditing" : ""

  const editStateChangingClassName = isEditStateChanging
    ? "Estimate_body__isEditChangingState"
    : ""

  return (
    <div className={`Estimate ${isEditingClassName} ${className}`}>
      <div className={`Estimate_body ${editStateChangingClassName}`}>
        <h2 className="Estimate_name">{criterion.name}</h2>
        {isNew
          ? renderNew(criterion, onSubmitNew)
          : !isEditing
            ? renderShow(estimate, onBeginEdit)
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

function renderShow(estimate, onBeginEdit) {
  return (
    <React.Fragment>
      <div className="Estimate_estimate">Estimate: {estimate.estimate}</div>
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
