import React from "react"

import NumberInput from "NumberInput"

export default function EstimateInput({ ...props }) {
  return <NumberInput min="0" max="100" {...props} />
}
