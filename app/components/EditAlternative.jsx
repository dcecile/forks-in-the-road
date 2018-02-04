import React from "react"

import Button from "Button"
import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default class EditAlternative extends React.Component {
  constructor({ alternative }) {
    super()
    this.state = {
      name: alternative.name,
      url: alternative.url || ""
    }
  }

  get className() {
    return this.props.className
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
      name: event.target.value
    })
  }

  handleChangeUrl(event) {
    this.setState({
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
      <form
        className={`EditAlternative ${this.className}`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <div className="EditAlternative_row">
          <TextInput
            className="EditAlternative_name"
            required
            placeholder="Alternative name"
            value={this.name}
            onChange={event => this.handleChangeName(event)}
          />
          <TextInput
            className="EditAlternative_url"
            type="text"
            placeholder="Alternative URL (optional)"
            value={this.url}
            onChange={event => this.handleChangeUrl(event)}
          />
        </div>
        <div className="EditAlternative_buttonRow">
          <SubmitButton className="EditAlternative_submit">Save</SubmitButton>
          <Button
            className="EditAlternative_cancel"
            onClick={event => this.handleCancel(event)}
          >
            Cancel
          </Button>
        </div>
      </form>
    )
  }
}
