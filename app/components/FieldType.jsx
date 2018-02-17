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
    input: value => (value * 100).toString(),
    output: value => parseFloat(value) / 100
  },

  nullFloatPercent: {
    input: value => (value !== null ? (value * 100).toString() : ""),
    output: value => (value !== "" ? parseFloat(value) / 100 : null)
  }
}
