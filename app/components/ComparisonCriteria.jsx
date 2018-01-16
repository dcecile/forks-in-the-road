import React from "react"
import Criterion from "Criterion"
import NewCriterion from "NewCriterion"
import ComparisonHeader from "ComparisonHeader"

function ComparisonCriteria({
  matchUrl,
  criteria,
  onSubmitNewCriterion,
  onSubmitEditCriterion
}) {
  const renderCriterion = criterion => (
    <Criterion
      key={criterion.id}
      className="ComparisonCriteria_item"
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

export default ComparisonCriteria
