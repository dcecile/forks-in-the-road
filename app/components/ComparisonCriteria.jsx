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
    <li key={criterion.id}>
      <Criterion criterion={criterion} onSubmitEdit={onSubmitEditCriterion} />
    </li>
  )

  return (
    <div>
      <ComparisonHeader matchUrl={`${matchUrl}/criteria`} title="Criteria" />
      <ul>
        {criteria.map(renderCriterion)}
        <li>
          <NewCriterion onSubmit={onSubmitNewCriterion} />
        </li>
      </ul>
    </div>
  )
}

export default ComparisonCriteria
