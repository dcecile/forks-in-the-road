import React from "react"
import SubmitButton from "SubmitButton"
import NumberInput from "NumberInput"

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
      <form
        className="NewEstimate"
        onSubmit={event => this.handleSubmit(event)}
      >
        <NumberInput
          className="NewEstimate_input"
          required
          min="0"
          max="100"
          placeholder={`Estimate: ${this.criterion.default_estimate}`}
          value={this.estimate}
          onChange={event => this.handleChangeEstimate(event)}
        />
        <SubmitButton className="NewEstimate_button">Save</SubmitButton>
      </form>
    )
  }
}

export default NewEstimate
