import React from "react"
import EditEstimate from "EditEstimate"
import Button from "Button"

class Estimate extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
  }

  get className() {
    return this.props.className
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
        <div className={`Estimate ${this.className}`}>
          <div className="Estimate_body">
            <h2 className="Estimate_name">{this.criterion.name}</h2>
            <div className="Estimate_estimate">
              Estimate: {this.estimate.estimate}
            </div>
            <Button
              className="Estimate_editButton"
              onClick={() => this.handleBeginEdit()}
            >
              Edit
            </Button>
          </div>
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
