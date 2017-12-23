import React from "react"

const initialState = {
  name: ""
}

class NewComparison extends React.Component {
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

  handleSubmit(event) {
    event.preventDefault()
    this.state.onSubmit({
      name: this.state.name
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
          placeholder="New comparison"
          value={this.state.name}
          onChange={event => this.handleChangeName(event)}
        />
        <input type="submit" value="Add" />
      </form>
    )
  }
}

export default NewComparison
