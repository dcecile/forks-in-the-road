import React from "react"
import { Link } from "react-router-dom"
import NewAlternative from "NewAlternative"

function ComparisonAlternatives({
  matchUrl,
  alternatives,
  isAlternativeNewlyCreated,
  onSubmitNewAlternative
}) {
  const getNewlyCreatedClassName = i =>
    i === 0 && isAlternativeNewlyCreated
      ? "ComparisonAlternatives_link__isNewlyCreated"
      : ""

  const renderAlternativeLink = (alternative, i) => (
    <Link
      className={`ComparisonAlternatives_link ${getNewlyCreatedClassName(i)}`}
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
