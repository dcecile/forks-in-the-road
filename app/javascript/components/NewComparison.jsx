import React from "react"

const initialState = {
  name: ''
}

class NewComparison extends React.Component {
  constructor({ onSubmit }) {
    super()
    this.state = {
      ...initialState,
      onSubmit
    }
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleSubmit(event) {
    this.state.onSubmit({
      name: this.state.name
    })
    this.setState({
      ...this.state,
      ...initialState
    })
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input
          type="text"
          placeholder="New comparison"
          value={this.state.name}
          onChange={event => this.handleChange(event)}
        />
        <input
          type="submit"
          value="Add"
        />
      </form>
    )
  }
}

export default NewComparison
