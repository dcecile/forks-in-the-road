import React from "react"

class EditEstimate extends React.Component {
  constructor({ estimate, criterion, onSubmit, onCancel }) {
    super()
    this.state = {
      id: estimate.id,
      estimate: estimate.estimate * 100,
      criterion,
      onSubmit,
      onCancel
    }
  }

  handleChangeEstimate(event) {
    this.setState({
      ...this.state,
      estimate: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.state.onSubmit({
      id: this.state.id,
      estimate: parseFloat(this.state.estimate) / 100
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
          {this.state.criterion.name}:{" "}
          <input
            type="number"
            required
            min="0"
            max="100"
            placeholder="Estimate"
            value={this.state.estimate}
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
