import MdLibraryAdd from "react-icons/lib/md/library-add"
import React from "react"

import SubmitButton from "SubmitButton"
import TextInput from "TextInput"

export default class NewComparison extends React.Component {
  constructor() {
    super()
    this.state = {
      name: ""
    }
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

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.onSubmit({
      name: this.name
    })
  }

  render() {
    return (
      <form
        className={`NewComparison ${this.className}`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <TextInput
          className="NewComparison_input"
          type="text"
          required
          placeholder="New comparison"
          value={this.name}
          onChange={event => this.handleChangeName(event)}
        />
        <SubmitButton className="NewComparison_button">
          <MdLibraryAdd /> Create
        </SubmitButton>
      </form>
    )
  }
}
