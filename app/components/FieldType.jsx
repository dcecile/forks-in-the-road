export default {
  string: {
    input: value => value,
    output: value => value
  },

  nullString: {
    input: value => value || "",
    output: value => value || null
  }
}
