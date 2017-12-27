import React from "react"

const initialState = {
  name: "",
  url: ""
}

class NewAlternative extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  get onSubmit() {
    return this.props.onSubmit
  }

  get name() {
    return this.state.name
  }

  get url() {
    return this.state.url
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
    this.onSubmit({
      name: this.name,
      url: this.url || null
    })
    this.setState(initialState)
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input
          type="text"
          required
          placeholder="New alternative name"
          value={this.name}
          onChange={event => this.handleChangeName(event)}
        />
        <input
          type="text"
          placeholder="New alternative URL"
          value={this.url}
          onChange={event => this.handleChangeURL(event)}
        />
        <input type="submit" value="Add" />
      </form>
    )
  }
}

export default NewAlternative
