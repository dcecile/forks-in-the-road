import React from "react"
import MdAdd from "react-icons/lib/md/add"
import TextInput from "TextInput"
import SubmitButton from "SubmitButton"

const initialState = {
  name: "",
  url: ""
}

export default class NewAlternative extends React.Component {
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
      <form
        className={`NewAlternative ${this.className}`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <TextInput
          className="NewAlternative_name"
          required
          placeholder="New alternative name"
          value={this.name}
          onChange={event => this.handleChangeName(event)}
        />
        <TextInput
          className="NewAlternative_url"
          placeholder="New alternative URL (optional)"
          value={this.url}
          onChange={event => this.handleChangeURL(event)}
        />
        <SubmitButton className="NewAlternative_submit">
          <MdAdd className="NewAlternative_submitIcon" /> Add
        </SubmitButton>
      </form>
    )
  }
}
