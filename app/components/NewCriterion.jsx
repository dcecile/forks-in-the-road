import React from "react"

const initialState = {
  name: "",
  full_value: ""
}

class NewCriterion extends React.Component {
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
      ...this.state,
      name: event.target.value
    })
  }

  handleChangeFullValue(event) {
    this.setState({
      ...this.state,
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
        className={`${this.className} NewCriterion`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <input
          type="text"
          required
          placeholder="New criterion name"
          value={this.name}
          onChange={event => this.handleChangeName(event)}
        />
        <input
          type="number"
          required
          placeholder="New criterion full value"
          value={this.full_value}
          onChange={event => this.handleChangeFullValue(event)}
        />
        <input type="submit" value="Add" />
      </form>
    )
  }
}

export default NewCriterion
