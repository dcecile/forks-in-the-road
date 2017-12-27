import React from "react"

class EditEstimate extends React.Component {
  constructor({ estimate }) {
    super()
    this.state = {
      estimate: estimate.estimate * 100
    }
  }

  get id() {
    return this.props.estimate.id
  }

  get criterion() {
    return this.props.criterion
  }

  get onSubmit() {
    return this.props.onSubmit
  }

  get onCancel() {
    return this.props.onCancel
  }

  get estimate() {
    return this.state.estimate
  }

  handleChangeEstimate(event) {
    this.setState({
      ...this.state,
      estimate: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.onSubmit({
      id: this.id,
      estimate: parseFloat(this.estimate) / 100
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
          {this.criterion.name}:{" "}
          <input
            type="number"
            required
            min="0"
            max="100"
            placeholder="Estimate"
            value={this.estimate}
            onChange={event => this.handleChangeEstimate(event)}
          />
        </label>{" "}
        <input type="submit" value="Save" />{" "}
        <input
          type="button"
          value="Cancel"
          onClick={event => this.handleCancel(event)}
        />
      </form>
    )
  }
}

export default EditEstimate
