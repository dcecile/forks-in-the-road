import React from "react"
import EditEstimate from "EditEstimate"

class Estimate extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
  }

  get estimate() {
    return this.props.estimate
  }

  get criterion() {
    return this.props.criterion
  }

  get onSubmitEdit() {
    return this.props.onSubmitEdit
  }

  get isEditing() {
    return this.state.isEditing
  }

  handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditing: true
    })
  }

  async handleSubmitEdit(estimate) {
    await this.onSubmitEdit(estimate)
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  }

  render() {
    if (!this.isEditing) {
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
