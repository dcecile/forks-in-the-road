import React from "react"
import { Link } from "react-router-dom"

import ComparisonHeader from "ComparisonHeader"
import NewAlternative from "NewAlternative"
import AlternativeIndexState from "AlternativeIndexState"

export default function AlternativeIndex(props) {
  const { comparison, server, onSetComparisonState } = props
  return (
    <AlternativeIndexState
      {...{ comparison, server, onSetComparisonState }}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({
  matchUrl,
  comparison,
  isAlternativeNewlyCreated,
  onSubmitNewAlternative
}) {
  return (
    <div className="AlternativeIndex">
      {renderHeader(matchUrl)}
      {renderNewAlternative(onSubmitNewAlternative)}
      {renderAlternativeLinks(
        matchUrl,
        comparison.alternatives,
        isAlternativeNewlyCreated
      )}
    </div>
  )
}

function renderHeader(matchUrl) {
  return <ComparisonHeader matchUrl={matchUrl} title="Alternatives" />
}

function renderNewAlternative(onSubmitNewAlternative) {
  return (
    <NewAlternative
      className="AlternativeIndex_new"
      onSubmit={onSubmitNewAlternative}
    />
  )
}

function renderAlternativeLinks(
  matchUrl,
  alternatives,
  isAlternativeNewlyCreated
) {
  const getNewlyCreatedClassName = i =>
    i === 0 && isAlternativeNewlyCreated
      ? "AlternativeIndex_link__isNewlyCreated"
      : ""

  return alternatives.map((alternative, i) =>
    renderAlternativeLink(matchUrl, alternative, getNewlyCreatedClassName(i))
  )
}

function renderAlternativeLink(matchUrl, alternative, newlyCreatedClassName) {
  return (
    <Link
      className={`AlternativeIndex_link ${newlyCreatedClassName}`}
      key={alternative.id}
      to={`${matchUrl}/alternative/${alternative.id}`}
    >
      {alternative.name}
    </Link>
  )
}
