import React from "react"
import EditEstimate from "EditEstimate"
import NewEstimate from "NewEstimate"
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

  get onSubmitNew() {
    return this.props.onSubmitNew
  }

  get onSubmitEdit() {
    return this.props.onSubmitEdit
  }

  get isNew() {
    return !this.estimate
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
    if (this.isNew) {
      return this.renderNew()
    } else if (!this.isEditing) {
      return this.renderShow()
    } else {
      return this.renderEdit()
    }
  }

  renderNew() {
    return (
      <NewEstimate
        criterion={this.criterion}
        onSubmit={estimate => this.onSubmitNew(estimate)}
      />
    )
  }

  renderShow() {
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
  }

  renderEdit() {
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

export default Estimate
