import React from "react"
import { Link } from "react-router-dom"
import NewAlternative from "NewAlternative"

function ComparisonAlternatives({
  matchUrl,
  alternatives,
  onSubmitNewAlternative
}) {
  const renderAlternativeLink = alternative => (
    <Link
      className="ComparisonAlternatives_link"
      key={alternative.id}
      to={`${matchUrl}/alternative/${alternative.id}`}
    >
      {alternative.name}
    </Link>
  )

  return (
    <div className="ComparisonAlternatives">
      <h1>
        <Link to={matchUrl}>Alternatives</Link>
      </h1>
      <NewAlternative
        className="ComparisonAlternatives_new"
        onSubmit={onSubmitNewAlternative}
      />
      {alternatives.map(renderAlternativeLink)}
    </div>
  )
}

export default ComparisonAlternatives
