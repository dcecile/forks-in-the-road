import FieldType from "FieldType"

export default {
  estimate: FieldType.floatPercent
}

export const unknownEstimate = 0.5

export function unknownEstimateIfNull(value) {
  return value === null ? unknownEstimate : value
}
