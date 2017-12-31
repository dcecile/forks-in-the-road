import React from "react"

class EditAlternative extends React.Component {
  constructor({ alternative }) {
    super()
    this.state = {
      name: alternative.name,
      url: alternative.url || ""
    }
  }

  get id() {
    return this.props.alternative.id
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

  get url() {
    return this.state.url
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
    this.onSubmit({
      id: this.id,
      name: this.name,
      url: this.url || null
    })
  }

  handleCancel(event) {
    event.preventDefault()
    this.onCancel()
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
            value={this.name}
            onChange={event => this.handleChangeName(event)}
          />
        </label>
        <br />
        <label>
          URL:
          <input
            type="text"
            placeholder="URL"
            value={this.url}
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
