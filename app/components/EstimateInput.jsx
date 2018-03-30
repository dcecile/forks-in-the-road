import React from "react"

import NumberInput from "NumberInput"
import { convertPercentToString } from "PercentFormat"
import { unknownEstimateIfNull } from "EstimateFields"

export default function EstimateInput({
  defaultEstimate,
  skipPlaceholderText,
  ...props
}) {
  const placeholderText = skipPlaceholderText ? "" : "Estimate: "
  const placeholderValue = convertPercentToString(
    unknownEstimateIfNull(defaultEstimate)
  )
  return (
    <NumberInput
      min="0"
      max="100"
      placeholder={`${placeholderText}${placeholderValue}`}
      {...props}
    />
  )
}
