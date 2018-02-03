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

  get onSubmitReset() {
    return this.props.onSubmitReset
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

  async handleSubmitReset() {
    await this.onSubmitReset(this.estimate)
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  }

  render() {
    return (
      <div className={`Estimate ${this.className}`}>
        <div className="Estimate_body">
          <h2 className="Estimate_name">{this.criterion.name}</h2>
          {this.isNew
            ? this.renderNew()
            : !this.isEditing ? this.renderShow() : this.renderEdit()}
        </div>
      </div>
    )
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
      <React.Fragment>
        <div className="Estimate_estimate">
          Estimate: {this.estimate.estimate}
        </div>
        <Button
          className="Estimate_editButton"
          onClick={() => this.handleBeginEdit()}
        >
          Edit
        </Button>
      </React.Fragment>
    )
  }

  renderEdit() {
    return (
      <EditEstimate
        estimate={this.estimate}
        criterion={this.criterion}
        onSubmit={estimate => this.handleSubmitEdit(estimate)}
        onCancel={() => this.handleCancelEdit()}
        onReset={() => this.handleSubmitReset()}
      />
    )
  }
}

export default Estimate
