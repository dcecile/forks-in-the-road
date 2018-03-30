import {
  convertBareStringToPercent,
  convertPercentToBareString
} from "PercentFormat"

export default {
  string: {
    input: value => value,
    output: value => value
  },

  nullString: {
    input: value => value || "",
    output: value => value || null
  },

  float: {
    input: value => value.toString(),
    output: value => parseFloat(value)
  },

  floatPercent: {
    input: convertPercentToBareString,
    output: convertBareStringToPercent
  },

  nullFloatPercent: {
    input: value => (value !== null ? convertPercentToBareString(value) : ""),
    output: value => (value !== "" ? convertBareStringToPercent(value) : null)
  }
}
