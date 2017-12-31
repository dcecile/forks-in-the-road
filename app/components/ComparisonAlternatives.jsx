import React from "react"
import { Link } from "react-router-dom"
import NewAlternative from "NewAlternative"

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

  return (
    <div>
      <h1>
        <Link to={matchUrl}>Alternatives</Link>
      </h1>
      <ul>
        {alternatives.map(renderAlternativeLink)}
        <li>
          <NewAlternative onSubmit={onSubmitNewAlternative} />
        </li>
      </ul>
    </div>
  )
}

export default ComparisonAlternatives
