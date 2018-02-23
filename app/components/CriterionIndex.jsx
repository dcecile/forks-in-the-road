import React from "react"

import ComparisonHeader from "ComparisonHeader"
import Criterion from "Criterion"
import CriterionIndexState from "CriterionIndexState"
import NewCriterion from "NewCriterion"

export default function CriterionIndex(props) {
  const { comparison, server, onSetComparisonState } = props
  return (
    <CriterionIndexState
      {...{ comparison, server, onSetComparisonState }}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

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
        isCriterionNewlyCreated,
        onSubmitEditCriterion
      )}
      {renderNewCriterion(onSubmitNewCriterion)}
    </div>
  )
}

function renderHeader(matchUrl) {
  return <ComparisonHeader matchUrl={`${matchUrl}/criteria`} title="Criteria" />
}

function renderCriteria(
  criteria,
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
      getNewlyCreatedClassName(i),
      onSubmitEditCriterion
    )
  )
}

function renderCriterion(
  criterion,
  newlyCreatedClassName,
  onSubmitEditCriterion
) {
  return (
    <Criterion
      key={criterion.id}
      className={`CriterionIndex_item ${newlyCreatedClassName}`}
      criterion={criterion}
      onSubmitEdit={onSubmitEditCriterion}
    />
  )
}

function renderNewCriterion(onSubmitNewCriterion) {
  return (
    <NewCriterion
      className="CriterionIndex_newItem"
      onSubmit={onSubmitNewCriterion}
    />
  )
}
