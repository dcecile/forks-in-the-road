import React from "react"

class NewEstimate extends React.Component {
  constructor() {
    super()
    this.state = {
      estimate: ""
    }
  }

  get criterion() {
    return this.props.criterion
  }

  get onSubmit() {
    return this.props.onSubmit
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
      criterion_id: this.criterion.id,
      estimate: parseFloat(this.estimate) / 100
    })
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
        <input type="submit" value="Save" />
      </form>
    )
  }
}

export default NewEstimate
