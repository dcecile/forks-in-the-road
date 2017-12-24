import React from "react"
import MdLibraryAdd from "react-icons/lib/md/library-add"

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
      <form className="form-group col-md-6" onSubmit={event => this.handleSubmit(event)}>
        <div className="input-group">
          <span className="input-group-addon">
            <MdLibraryAdd />
          </span>
          <input
            className="form-control"
            type="text"
            required
            placeholder="New comparison"
            value={this.state.name}
            onChange={event => this.handleChangeName(event)}
          />
          <input className="btn btn-primary" type="submit" value="Add" />
        </div>
      </form>
    )
  }
}

export default NewComparison
