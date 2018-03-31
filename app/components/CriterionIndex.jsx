import React from "react"

import ComparisonHeader from "ComparisonHeader"
import Criterion from "Criterion"
import CriterionIndexState from "CriterionIndexState"
import NewCriterion from "NewCriterion"

export default CriterionIndexState.renderWith(render)

function render({
  matchUrl,
  comparison,
  isCriterionNewlyCreated,
  onSubmitNewCriterion,
  onSubmitEditCriterion
}) {
  return (
    <div className="CriterionIndex">
      {renderHeader(matchUrl)}
      {renderCriteria(
        comparison.criteria,
        comparison.value_unit,
        isCriterionNewlyCreated,
        onSubmitEditCriterion
      )}
      {renderNewCriterion(comparison.value_unit, onSubmitNewCriterion)}
    </div>
  )
}

function renderHeader(matchUrl) {
  return <ComparisonHeader matchUrl={`${matchUrl}/criteria`} title="Criteria" />
}

function renderCriteria(
  criteria,
  valueUnit,
  isCriterionNewlyCreated,
  onSubmitEditCriterion
) {
  const getNewlyCreatedClassName = i =>
    i === criteria.length - 1 && isCriterionNewlyCreated
      ? "CriterionIndex_item__isNewlyCreated"
      : ""

  return criteria.map((criteria, i) =>
    renderCriterion(
      criteria,
      valueUnit,
      getNewlyCreatedClassName(i),
      onSubmitEditCriterion
    )
  )
}

function renderCriterion(
  criterion,
  valueUnit,
  newlyCreatedClassName,
  onSubmitEditCriterion
) {
  return (
    <Criterion
      key={criterion.id}
      className={`CriterionIndex_item ${newlyCreatedClassName}`}
      criterion={criterion}
      valueUnit={valueUnit}
      onSubmitEdit={onSubmitEditCriterion}
    />
  )
}

function renderNewCriterion(valueUnit, onSubmitNewCriterion) {
  return (
    <NewCriterion
      className="CriterionIndex_newItem"
      valueUnit={valueUnit}
      onSubmit={onSubmitNewCriterion}
    />
  )
}
