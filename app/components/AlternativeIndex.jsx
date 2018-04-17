import React from "react"
import pluralize from "pluralize"
import { Link } from "react-router-dom"
import { ascend, contains, descend, sortWith } from "ramda"

import AlternativeIndexState from "AlternativeIndexState"
import ComparisonHeader from "ComparisonHeader"
import NewAlternative from "NewAlternative"
import { calculateAlternativeValue } from "ValueCalculation"
import { convertValueToString } from "ValueFormat"
import { defaultValueUnitIfNull } from "ComparisonFields"

export default AlternativeIndexState.renderWith(render)

function render({
  matchUrl,
  comparison,
  matchingItems,
  newlyCreatedItems,
  onNewAlternativeNameChange,
  onSubmitNewAlternative
}) {
  const alternativesWithValues = comparison.alternatives.map(alternative => ({
    item: alternative,
    value: calculateAlternativeValue(alternative, comparison.criteria)
  }))

  const alternativesSortedWithValues = sortAlternatives(alternativesWithValues)

  return (
    <div className="AlternativeIndex">
      {renderHeader(matchUrl)}
      {renderNewAlternative(onNewAlternativeNameChange, onSubmitNewAlternative)}
      <div className="AlternativeIndex_items">
        {renderAlternativeLinks(
          matchUrl,
          alternativesSortedWithValues,
          comparison.criteria,
          comparison.value_unit,
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

const sortAlternatives = sortWith([
  descend(alternativeWithValue => alternativeWithValue.value),
  ascend(alternativeWithValue => alternativeWithValue.item.name.toLowerCase())
])

function renderAlternativeLinks(
  matchUrl,
  alternativesSortedWithValues,
  criteria,
  valueUnit,
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

  return alternativesSortedWithValues.map(alternativeWithValue =>
    renderAlternativeLink(
      matchUrl,
      alternativeWithValue,
      criteria,
      valueUnit,
      getMatchingClassName(alternativeWithValue.item),
      getNewlyCreatedClassName(alternativeWithValue.item)
    )
  )
}

function renderAlternativeLink(
  matchUrl,
  alternativeWithValue,
  criteria,
  valueUnit,
  matchingClassName,
  newlyCreatedClassName
) {
  const missingEstimates =
    criteria.length - alternativeWithValue.item.estimates.length
  return (
    <Link
      className={`AlternativeIndex_link ${matchingClassName} ${newlyCreatedClassName}`}
      key={alternativeWithValue.item.id}
      to={`${matchUrl}/alternative/${alternativeWithValue.item.id}`}
    >
      <span>{alternativeWithValue.item.name}</span>
      {missingEstimates ? (
        <span className="AlternativeIndex_linkMissingEstimates">{`${missingEstimates} missing ${pluralize(
          "estimate"
        )}`}</span>
      ) : null}
      <span className="AlternativeIndex_linkValue">
        {convertValueToString(
          defaultValueUnitIfNull(valueUnit),
          alternativeWithValue.value
        )}
      </span>
    </Link>
  )
}
