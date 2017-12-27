import React from "react"
import MdLibraryAdd from "react-icons/lib/md/library-add"
import Button from "Button"

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
      <form
        className={`NewComparison ${this.props.className}`}
        onSubmit={event => this.handleSubmit(event)}
      >
        <input
          className="NewComparison_input"
          type="text"
          required
          placeholder="New comparison"
          value={this.state.name}
          onChange={event => this.handleChangeName(event)}
        />
        <Button className="NewComparison_button" type="submit">
          <MdLibraryAdd /> Add
        </Button>
      </form>
    )
  }
}

export default NewComparison
