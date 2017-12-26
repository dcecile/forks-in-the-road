import React from "react"

class NewEstimate extends React.Component {
  constructor({ criterion, onSubmit }) {
    super()
    this.state = {
      criterion,
      estimate: "",
      onSubmit
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
      criterion_id: this.state.criterion.id,
      estimate: parseFloat(this.state.estimate) / 100
    })
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
        <input type="submit" value="Save" />
      </form>
    )
  }
}

export default NewEstimate
