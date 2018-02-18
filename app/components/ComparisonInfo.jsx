import React from "react"

import Button from "Button"
import EditComparison from "EditComparison"
import ComparisonInfoState from "ComparisonInfoState"

export default function ComparisonInfo(props) {
  const { comparison, server, onSetComparisonState } = props
  return (
    <ComparisonInfoState
      {...{ comparison, server, onSetComparisonState }}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({
  className,
  comparison,
  isEditing,
  isEditStateChanging,
  onBeginEdit,
  onSubmitEdit,
  onCancelEdit
}) {
  const editStateChangingClassName = isEditStateChanging
    ? "ComparisonInfo_content__isChangingState"
    : ""

  return (
    <section className={`ComparisonInfo ${className}`}>
      <div className={`ComparisonInfo_content ${editStateChangingClassName}`}>
        {!isEditing
          ? renderEditButton(comparison, onBeginEdit)
          : renderEditForm(comparison, onSubmitEdit, onCancelEdit)}
      </div>
    </section>
  )
}

function renderEditButton(comparison, onBeginEdit) {
  return (
    <Button className="ComparisonInfo_editButton" onClick={onBeginEdit}>
      Edit comparison info for {comparison.name}
    </Button>
  )
}

function renderEditForm(comparison, onSubmitEdit, onCancelEdit) {
  return (
    <EditComparison
      comparison={comparison}
      onSubmit={onSubmitEdit}
      onCancel={onCancelEdit}
    />
  )
}
