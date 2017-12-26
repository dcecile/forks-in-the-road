import React from "react"
import EditEstimate from "EditEstimate"

class Estimate extends React.Component {
  constructor({ onSubmitEdit }) {
    super()
    this.state = {
      onSubmitEdit,
      isEditing: false
    }
  }

  get estimate() {
    return this.props.estimate
  }

  get criterion() {
    return this.props.criterion
  }

  handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditing: true
    })
  }

  async handleSubmitEdit(estimate) {
    await this.state.onSubmitEdit(estimate)
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  }

  render() {
    if (!this.state.isEditing) {
      return (
        <div>
          {this.criterion.name}: {this.estimate.estimate}{" "}
          <button onClick={() => this.handleBeginEdit()}>Edit</button>
        </div>
      )
    } else {
      return (
        <EditEstimate
          estimate={this.estimate}
          criterion={this.criterion}
          onSubmit={estimate => this.handleSubmitEdit(estimate)}
          onCancel={() => this.handleCancelEdit()}
        />
      )
    }
  }
}

export default Estimate
