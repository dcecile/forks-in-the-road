import React from "react"
import { Link } from "react-router-dom"

import ComparisonHeader from "ComparisonHeader"
import NewAlternative from "NewAlternative"

export default function ComparisonAlternatives({
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
      <ComparisonHeader matchUrl={matchUrl} title="Alternatives" />
      <NewAlternative
        className="ComparisonAlternatives_new"
        onSubmit={onSubmitNewAlternative}
      />
      {alternatives.map(renderAlternativeLink)}
    </div>
  )
}
