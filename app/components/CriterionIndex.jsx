import React from "react"

import ComparisonHeader from "ComparisonHeader"
import Criterion from "Criterion"
import NewCriterion from "NewCriterion"

export default function CriterionIndex({
  matchUrl,
  criteria,
  isCriterionNewlyCreated,
  onSubmitNewCriterion,
  onSubmitEditCriterion
}) {
  const getNewlyCreatedClassName = i =>
    i === criteria.length - 1 && isCriterionNewlyCreated
      ? "CriterionIndex_item__isNewlyCreated"
      : ""

  const renderCriterion = (criterion, i) => (
    <Criterion
      key={criterion.id}
      className={`CriterionIndex_item ${getNewlyCreatedClassName(i)}`}
      criterion={criterion}
      onSubmitEdit={onSubmitEditCriterion}
    />
  )

  return (
    <div className="CriterionIndex">
      <ComparisonHeader matchUrl={`${matchUrl}/criteria`} title="Criteria" />
      {criteria.map(renderCriterion)}
      <NewCriterion
        className="CriterionIndex_newItem"
        onSubmit={onSubmitNewCriterion}
      />
    </div>
  )
}
