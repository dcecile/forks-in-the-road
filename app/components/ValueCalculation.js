import pluralize from "pluralize"
import { sum } from "ramda"

import { unknownEstimateIfNull } from "EstimateFields"

export function calculateAlternativeValue(alternative, criteria) {
  const estimates = alternative.estimates
  const values = criteria.map(criterion =>
    calculateEstimateValue(findEstimate(estimates, criterion), criterion)
  )
  return sum(values)
}

export function calculateEstimateValue(estimate, criterion) {
  return (
    (estimate
      ? estimate.estimate
      : unknownEstimateIfNull(criterion.default_estimate)) *
    criterion.full_value
  )
}

export function findEstimate(estimates, criterion) {
  return estimates.find(estimate => estimate.criterion_id === criterion.id)
}

export function renderMissingEstimates(alternative, criteria, render) {
  const missingEstimates = countMissingEstimates(alternative, criteria)
  return missingEstimates
    ? render(`${missingEstimates} missing ${pluralize("estimate")}`)
    : null
}

function countMissingEstimates(alternative, criteria) {
  return criteria.length - alternative.estimates.length
}
