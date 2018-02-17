import React from "react"

import Button from "Button"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"

export default class EditEstimate extends React.Component {
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

  get onReset() {
    return this.props.onReset
  }

  get estimate() {
    return this.state.estimate
  }

  handleChangeEstimate(event) {
    this.setState({
      estimate: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.onSubmit({
      id: this.id,
      estimate: parseFloat(this.estimate) / 100
    })
  }

  handleCancel(event) {
    event.preventDefault()
    this.onCancel()
  }

  handleReset(event) {
    event.preventDefault()
    this.onReset()
  }

  render() {
    return (
      <form
        className="EditEstimate"
        onSubmit={event => this.handleSubmit(event)}
      >
        <NumberInput
          className="EditEstimate_input"
          required
          min="0"
          max="100"
          placeholder={`Estimate: ${this.criterion.default_estimate}`}
          value={this.estimate}
          onChange={event => this.handleChangeEstimate(event)}
        />
        <div className="EditEstimate_buttonGroup">
          <SubmitButton className="EditEstimate_button">Save</SubmitButton>
          <Button
            className="EditEstimate_button"
            onClick={event => this.handleCancel(event)}
          >
            Cancel
          </Button>
          <Button
            className="EditEstimate_resetButton"
            onClick={event => this.handleReset(event)}
          >
            Reset
          </Button>
        </div>
      </form>
    )
  }
}
