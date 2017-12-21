import React from "react"
import { Link } from "react-router-dom"

function ComparisonCriteria({ matchUrl, criteria }) {
  const renderCriterion = criterion => (
    <li key={criterion.id}>
      {criterion.name}
      {renderCriterionDetails(criterion)}
    </li>
  )

  const renderCriterionDetails = criterion => (
    <ul>
      {[
        criterion.description,
        criterion.full_value,
        criterion.default_estimate
      ].map(renderCriterionDetail)}
    </ul>
  )

  const renderCriterionDetail = (detail, i) =>
    detail !== null ? <li key={i}>{detail}</li> : null

  const renderAlternativesLink = () => (
    <h3>
      <Link to={matchUrl}>Alternatives</Link>
    </h3>
  )

  return (
    <div>
      <h3>Criteria</h3>
      <ul>{criteria.map(renderCriterion)}</ul>
      {renderAlternativesLink()}
    </div>
  )
}

export default ComparisonCriteria
