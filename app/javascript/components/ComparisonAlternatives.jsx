import React from "react"
import { Link } from "react-router-dom"
import NewAlternative from "./NewAlternative"

function ComparisonAlternatives({
  matchUrl,
  alternatives,
  onSubmitNewAlternative
}) {
  const renderAlternativeLink = alternative => (
    <li key={alternative.id}>
      <Link to={`${matchUrl}/alternative/${alternative.id}`}>
        {alternative.name}
      </Link>
    </li>
  )

  const renderCriteriaLink = () => (
    <h3>
      <Link to={`${matchUrl}/criteria`}>Criteria</Link>
    </h3>
  )

  return (
    <div>
      <h3>Alternatives</h3>
      <ul>
        {alternatives.map(renderAlternativeLink)}
        <li>
          <NewAlternative onSubmit={onSubmitNewAlternative} />
        </li>
      </ul>
      {renderCriteriaLink()}
    </div>
  )
}

export default ComparisonAlternatives
