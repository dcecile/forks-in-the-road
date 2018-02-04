import React from "react"
import TextInput from "TextInput"
import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"
import Button from "Button"

export default class EditCriterion extends React.Component {
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
      <form
        className="EditCriterion"
        onSubmit={event => this.handleSubmit(event)}
      >
        <label className="EditCriterion_label">
          Criterion name:
          <TextInput
            className="EditCriterion_input"
            required
            placeholder="Criterion"
            value={this.name}
            onChange={event => this.handleChangeName(event)}
          />
        </label>
        <label className="EditCriterion_label">
          Description (optional):
          <TextInput
            className="EditCriterion_input"
            placeholder="Why this criterion is important"
            value={this.description}
            onChange={event => this.handleChangeDescription(event)}
          />
        </label>
        <label className="EditCriterion_label">
          Full value:
          <NumberInput
            className="EditCriterion_input"
            required
            placeholder="1000"
            value={this.full_value}
            onChange={event => this.handleChangeFullValue(event)}
          />
        </label>
        <label className="EditCriterion_label">
          Default estimate (optional):
          <NumberInput
            className="EditCriterion_input"
            min="0"
            max="100"
            placeholder="50"
            value={this.default_estimate}
            onChange={event => this.handleChangeDefaultEstimate(event)}
          />
        </label>
        <div className="EditCriterion_buttonGroup">
          <SubmitButton className="EditCriterion_button">Save</SubmitButton>
          <Button
            className="EditCriterion_button"
            onClick={event => this.handleCancel(event)}
          >
            Cancel
          </Button>
        </div>
      </form>
    )
  }
}
