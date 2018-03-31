import FieldType from "FieldType"

export default {
  name: FieldType.string,
  alternative_noun: FieldType.nullString,
  value_unit: FieldType.nullString
}

export const defaultValueUnit = "$"

export function defaultValueUnitIfNull(valueUnit) {
  return valueUnit === null ? defaultValueUnit : valueUnit
}
