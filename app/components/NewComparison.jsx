import React from "react"
import MdLibraryAdd from "react-icons/lib/md/library-add"
import Button from "Button"

const initialState = {
  name: ""
}

class NewComparison extends React.Component {
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

  handleChangeName(event) {
    this.setState({
      ...this.state,
      name: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.onSubmit({
      name: this.name
    })
    this.setState(initialState)
  }

  render() {
    return (
      <form
        className={`NewComparison ${this.className}`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <input
          className="NewComparison_input"
          type="text"
          required
          placeholder="New comparison"
          value={this.name}
          onChange={event => this.handleChangeName(event)}
        />
        <Button className="NewComparison_button" type="submit">
          <MdLibraryAdd /> Create
        </Button>
      </form>
    )
  }
}

export default NewComparison
