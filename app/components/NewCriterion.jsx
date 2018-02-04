import MdAdd from "react-icons/lib/md/add"
import React from "react"

import NumberInput from "NumberInput"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

const initialState = {
  name: "",
  full_value: ""
}

export default class NewCriterion extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  get className() {
    return this.props.className
  }

  get onSubmit() {
    return this.props.onSubmit
  }

  get name() {
    return this.state.name
  }

  get full_value() {
    return this.state.full_value
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleChangeFullValue(event) {
    this.setState({
      full_value: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.onSubmit({
      name: this.name,
      full_value: parseFloat(this.full_value)
    })
    this.setState(initialState)
  }

  render() {
    return (
      <form
        className={`NewCriterion ${this.className}`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <TextInput
          className="NewCriterion_name"
          required
          placeholder="New criterion name"
          value={this.name}
          onChange={event => this.handleChangeName(event)}
        />
        <NumberInput
          className="NewCriterion_fullValue"
          required
          placeholder="New criterion full value"
          value={this.full_value}
          onChange={event => this.handleChangeFullValue(event)}
        />
        <SubmitButton className="NewCriterion_submit">
          <MdAdd className="NewCriterion_submitIcon" /> Add
        </SubmitButton>
      </form>
    )
  }
}
