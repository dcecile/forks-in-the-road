export default {
  string: {
    input: value => value,
    output: value => value,
    init: ""
  },

  nullString: {
    input: value => value || "",
    output: value => value || null,
    init: null
  }
}
