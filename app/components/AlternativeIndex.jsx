import React from "react"
import { Link } from "react-router-dom"
import { contains, sortBy } from "rambda"

import AlternativeIndexState from "AlternativeIndexState"
import ComparisonHeader from "ComparisonHeader"
import NewAlternative from "NewAlternative"

export default AlternativeIndexState.renderWith(render)

function render({
  matchUrl,
  comparison,
  matchingItems,
  newlyCreatedItems,
  onNewAlternativeNameChange,
  onSubmitNewAlternative
}) {
  return (
    <div className="AlternativeIndex">
      {renderHeader(matchUrl)}
      {renderNewAlternative(onNewAlternativeNameChange, onSubmitNewAlternative)}
      <div className="AlternativeIndex_items">
        {renderAlternativeLinks(
          matchUrl,
          sortAlternatives(comparison.alternatives),
          matchingItems,
          newlyCreatedItems
        )}
      </div>
    </div>
  )
}

function renderHeader(matchUrl) {
  return <ComparisonHeader matchUrl={matchUrl} title="Alternatives" />
}

function renderNewAlternative(
  onNewAlternativeNameChange,
  onSubmitNewAlternative
) {
  return (
    <NewAlternative
      className="AlternativeIndex_new"
      onNameChange={onNewAlternativeNameChange}
      onSubmit={onSubmitNewAlternative}
    />
  )
}

const sortAlternatives = sortBy(alternative => alternative.name.toLowerCase())

function renderAlternativeLinks(
  matchUrl,
  alternatives,
  matchingItems,
  newlyCreatedItems
) {
  const getMatchingClassName = alternative =>
    contains(alternative, matchingItems)
      ? "AlternativeIndex_link__isMatching"
      : ""

  const getNewlyCreatedClassName = alternative =>
    contains(alternative, newlyCreatedItems)
      ? "AlternativeIndex_link__isNewlyCreated"
      : ""

  return alternatives.map(alternative =>
    renderAlternativeLink(
      matchUrl,
      alternative,
      getMatchingClassName(alternative),
      getNewlyCreatedClassName(alternative)
    )
  )
}

function renderAlternativeLink(
  matchUrl,
  alternative,
  matchingClassName,
  newlyCreatedClassName
) {
  return (
    <Link
      className={`AlternativeIndex_link ${matchingClassName} ${newlyCreatedClassName}`}
      key={alternative.id}
      to={`${matchUrl}/alternative/${alternative.id}`}
    >
      {alternative.name}
    </Link>
  )
}
