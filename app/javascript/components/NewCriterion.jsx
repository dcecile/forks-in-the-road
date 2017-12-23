import React from "react"

const initialState = {
  name: "",
  full_value: ""
}

class NewCriterion extends React.Component {
  constructor({ onSubmit }) {
    super()
    this.state = {
      ...initialState,
      onSubmit
    }
  }

  handleChangeName(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleChangeFullValue(event) {
    console.log(event.target.value, event.target.value.__proto__)
    this.setState({
      ...this.state,
      full_value: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.state.onSubmit({
      name: this.state.name,
      full_value: parseFloat(this.state.full_value)
    })
    this.setState({
      ...this.state,
      ...initialState
    })
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input
          type="text"
          required
          placeholder="New criterion name"
          value={this.state.name}
          onChange={event => this.handleChangeName(event)}
        />
        <input
          type="number"
          required
          placeholder="New criterion full value"
          value={this.state.full_value}
          onChange={event => this.handleChangeFullValue(event)}
        />
        <input type="submit" value="Add" />
      </form>
    )
  }
}

export default NewCriterion
