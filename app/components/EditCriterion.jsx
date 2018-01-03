import React from "react"

class EditCriterion extends React.Component {
  constructor({ criterion }) {
    super()
    this.state = {
      name: criterion.name,
      description: criterion.description || "",
      full_value: this.convertFromFullValue(criterion),
      default_estimate: this.convertFromDefaultEstimate(criterion)
    }
  }

  get id() {
    return this.props.criterion.id
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

  get description() {
    return this.state.description
  }

  get full_value() {
    return this.state.full_value
  }

  get default_estimate() {
    return this.state.default_estimate
  }

  convertFromFullValue(criterion) {
    return criterion.full_value.toString()
  }

  convertToFullValue() {
    return parseFloat(this.full_value)
  }

  convertFromDefaultEstimate(criterion) {
    return criterion.default_estimate !== null
      ? (criterion.default_estimate * 100).toString()
      : ""
  }

  convertToDefaultEstimate() {
    return this.default_estimate !== ""
      ? parseFloat(this.default_estimate) / 100
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
    this.onSubmit({
      id: this.id,
      name: this.name,
      description: this.description || null,
      full_value: this.convertToFullValue(),
      default_estimate: this.convertToDefaultEstimate()
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
            placeholder="Criterion"
            value={this.name}
            onChange={event => this.handleChangeName(event)}
          />
        </label>
        <br />
        <label>
          Description (optional):
          <input
            type="text"
            placeholder="Description"
            value={this.description}
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
            value={this.full_value}
            onChange={event => this.handleChangeFullValue(event)}
          />
        </label>
        <br />
        <label>
          Default estimate (optional):
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Default estimate"
            value={this.default_estimate}
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
