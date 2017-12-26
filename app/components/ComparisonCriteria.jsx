import React from "react"
import { Link } from "react-router-dom"
import Criterion from "Criterion"
import NewCriterion from "NewCriterion"

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

  const renderAlternativesLink = () => (
    <h3>
      <Link to={matchUrl}>Alternatives</Link>
    </h3>
  )

  return (
    <div>
      <h3>Criteria</h3>
      <ul>
        {criteria.map(renderCriterion)}
        <li>
          <NewCriterion onSubmit={onSubmitNewCriterion} />
        </li>
      </ul>
      {renderAlternativesLink()}
    </div>
  )
}

export default ComparisonCriteria
