import React from "react"
import Criterion from "Criterion"
import NewCriterion from "NewCriterion"
import ComparisonHeader from "ComparisonHeader"

export default function ComparisonCriteria({
  matchUrl,
  criteria,
  isCriterionNewlyCreated,
  onSubmitNewCriterion,
  onSubmitEditCriterion
}) {
  const getNewlyCreatedClassName = i =>
    i === criteria.length - 1 && isCriterionNewlyCreated
      ? "ComparisonCriteria_item__isNewlyCreated"
      : ""

  const renderCriterion = (criterion, i) => (
    <Criterion
      key={criterion.id}
      className={`ComparisonCriteria_item ${getNewlyCreatedClassName(i)}`}
      criterion={criterion}
      onSubmitEdit={onSubmitEditCriterion}
    />
  )

  return (
    <div className="ComparisonCriteria">
      <ComparisonHeader matchUrl={`${matchUrl}/criteria`} title="Criteria" />
      {criteria.map(renderCriterion)}
      <NewCriterion
        className="ComparisonCriteria_newItem"
        onSubmit={onSubmitNewCriterion}
      />
    </div>
  )
}
