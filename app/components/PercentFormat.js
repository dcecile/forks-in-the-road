export function convertPercentToBareString(value) {
  return ((value * 100) | 0).toString()
}

export function convertPercentToString(value) {
  return `${convertPercentToBareString(value)}%`
}

export function convertBareStringToPercent(value) {
  return parseFloat(value) / 100
}
