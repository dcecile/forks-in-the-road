import React from "react"

class EditCriterion extends React.Component {
  constructor({ criterion, onSubmit, onCancel }) {
    super()
    this.state = {
      id: criterion.id,
      name: criterion.name,
      description: criterion.description || "",
      full_value: this.convertFromFullValue(criterion),
      default_estimate: this.convertFromDefaultEstimate(criterion),
      onSubmit,
      onCancel
    }
  }

  convertFromFullValue(criterion) {
    return criterion.full_value.toString()
  }

  convertToFullValue() {
    return parseFloat(this.state.full_value)
  }

  convertFromDefaultEstimate(criterion) {
    return criterion.default_estimate !== null
      ? (criterion.default_estimate * 100).toString()
      : ""
  }

  convertToDefaultEstimate() {
    return this.state.default_estimate !== ""
      ? parseFloat(this.state.default_estimate) / 100
      : null
  }

  handleChangeName(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleChangeDescription(event) {
    this.setState({
      ...this.state,
      description: event.target.value
    })
  }

  handleChangeFullValue(event) {
    this.setState({
      ...this.state,
      full_value: event.target.value
    })
  }

  handleChangeDefaultEstimate(event) {
    this.setState({
      ...this.state,
      default_estimate: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.state.onSubmit({
      id: this.state.id,
      name: this.state.name,
      description: this.state.description || null,
      full_value: this.convertToFullValue(),
      default_estimate: this.convertToDefaultEstimate()
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
            placeholder="Criterion"
            value={this.state.name}
            onChange={event => this.handleChangeName(event)}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={event => this.handleChangeDescription(event)}
          />
        </label>
        <br />
        <label>
          Full value:
          <input
            type="number"
            required
            placeholder="Full value"
            value={this.state.full_value}
            onChange={event => this.handleChangeFullValue(event)}
          />
        </label>
        <br />
        <label>
          Default estimate:
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Default estimate"
            value={this.state.default_estimate}
            onChange={event => this.handleChangeDefaultEstimate(event)}
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

export default EditCriterion
