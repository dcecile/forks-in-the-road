import { sum } from "ramda"

export function calculateAlternativeValue(alternative, criteria) {
  const estimates = alternative.estimates
  const values = criteria.map(criterion =>
    calculateEstimateValue(findEstimate(estimates, criterion), criterion)
  )
  return sum(values)
}

export function calculateEstimateValue(estimate, criterion) {
  return (
    (estimate ? estimate.estimate : criterion.default_estimate) *
    criterion.full_value
  )
}

export function findEstimate(estimates, criterion) {
  return estimates.find(estimate => estimate.criterion_id === criterion.id)
}
