import React from "react"

const initialState = {
  name: "",
  url: ""
}

class NewAlternative extends React.Component {
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

  handleChangeURL(event) {
    this.setState({
      ...this.state,
      url: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.state.onSubmit({
      name: this.state.name,
      url: this.state.url || null
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
          placeholder="New alternative name"
          value={this.state.name}
          onChange={event => this.handleChangeName(event)}
        />
        <input
          type="text"
          placeholder="New alternative URL"
          value={this.state.url}
          onChange={event => this.handleChangeURL(event)}
        />
        <input type="submit" value="Add" />
      </form>
    )
  }
}

export default NewAlternative
