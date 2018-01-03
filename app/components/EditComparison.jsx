import React from "react"

class EditComparison extends React.Component {
  constructor({ comparison }) {
    super()
    this.state = {
      name: comparison.name,
      alternative_noun: comparison.alternative_noun || "",
      value_unit: comparison.value_unit || ""
    }
  }

  get onSubmit() {
    return this.props.onSubmit
  }

  get onCancel() {
    return this.props.onCancel
  }

  get name() {
    return this.state.name
  }

  get alternative_noun() {
    return this.state.alternative_noun
  }

  get value_unit() {
    return this.state.value_unit
  }

  handleChangeName(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleChangeAlternativeNoun(event) {
    this.setState({
      ...this.state,
      alternative_noun: event.target.value
    })
  }

  handleChangeValueUnit(event) {
    this.setState({
      ...this.state,
      value_unit: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.onSubmit({
      name: this.name,
      alternative_noun: this.alternative_noun || null,
      value_unit: this.value_unit || null
    })
  }

  handleCancel(event) {
    event.preventDefault()
    this.onCancel()
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <label>
          Name:
          <input
            type="text"
            required
            placeholder="Comparison"
            value={this.name}
            onChange={event => this.handleChangeName(event)}
          />
        </label>
        <br />
        <label>
          Alternative noun (optional):
          <input
            type="text"
            placeholder="alternative"
            value={this.alternative_noun}
            onChange={event => this.handleChangeAlternativeNoun(event)}
          />
        </label>
        <br />
        <label>
          Value unit (optional):
          <input
            type="text"
            placeholder="$"
            value={this.value_unit}
            onChange={event => this.handleChangeValueUnit(event)}
          />
        </label>
        <br />
        <input type="submit" value="Save" />
        <input
          type="button"
          value="Cancel"
          onClick={event => this.handleCancel(event)}
        />
      </form>
    )
  }
}

export default EditComparison
