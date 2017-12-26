import React from "react"

class EditAlternative extends React.Component {
  constructor({ alternative, onSubmit, onCancel }) {
    super()
    this.state = {
      id: alternative.id,
      name: alternative.name,
      url: alternative.url || "",
      onSubmit,
      onCancel
    }
  }

  handleChangeName(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleChangeUrl(event) {
    this.setState({
      ...this.state,
      url: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.state.onSubmit({
      id: this.state.id,
      name: this.state.name,
      url: this.state.url || null
    })
  }

  handleCancel(event) {
    event.preventDefault()
    this.state.onCancel()
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <label>
          Name:
          <input
            type="text"
            required
            placeholder="Alternative"
            value={this.state.name}
            onChange={event => this.handleChangeName(event)}
          />
        </label>
        <br />
        <label>
          URL:
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={event => this.handleChangeUrl(event)}
          />
        </label>
        <br />
        <input type="submit" value="Save" />
        <input
          type="button"
          value="Cancel"
          onClick={event => this.handleCancel(event)}
        />
      </form>
    )
  }
}

export default EditAlternative
