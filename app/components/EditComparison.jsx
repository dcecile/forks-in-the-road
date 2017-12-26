import React from "react"

class EditComparison extends React.Component {
  constructor({ comparison, onSubmit, onCancel }) {
    super()
    this.state = {
      name: comparison.name,
      alternative_noun: comparison.alternative_noun || "",
      value_unit: comparison.value_unit || "",
      onSubmit,
      onCancel
    }
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
    this.state.onSubmit({
      name: this.state.name,
      alternative_noun: this.state.alternative_noun || null,
      value_unit: this.state.value_unit || null
    })
  }

  handleCancel(event) {
    event.preventDefault()
    this.state.onCancel()
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
            value={this.state.name}
            onChange={event => this.handleChangeName(event)}
          />
        </label>
        <br />
        <label>
          Alternative noun:
          <input
            type="text"
            placeholder="alternative"
            value={this.state.alternative_noun}
            onChange={event => this.handleChangeAlternativeNoun(event)}
          />
        </label>
        <br />
        <label>
          Value unit:
          <input
            type="text"
            placeholder="$"
            value={this.state.value_unit}
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
