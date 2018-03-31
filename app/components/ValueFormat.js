export function convertValueToString(valueUnit, value) {
  const valueString = (value | 0).toString()
  const valueWithSeparators = valueString.replace(
    /\d(?=(\d{3})+$)/g,
    "$&,",
    "g"
  )
  return `${valueUnit}${valueWithSeparators}`
}
