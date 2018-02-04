import React from "react"

import Button from "Button"
import EditEstimate from "EditEstimate"
import NewEstimate from "NewEstimate"
import Timing from "Timing"

export default class Estimate extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false,
      isEditStateChanging: false
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

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  get isNew() {
    return !this.estimate
  }

  get isEditingClassName() {
    return this.isEditing ? "Estimate__isEditing" : ""
  }

  get editStateChangingClassName() {
    return this.isEditStateChanging ? "Estimate_body__isEditChangingState" : ""
  }

  async handleBeginEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.estimateEditStateChange()
    this.setState({
      isEditing: true,
      isEditStateChanging: false
    })
  }

  async handleSubmitNew(estimate) {
    await this.onSubmitNew(estimate)
    this.setState({
      isEditStateChanging: true
    })
    await Timing.estimateEditStateChange()
    this.setState({
      isEditStateChanging: false
    })
  }

  async handleSubmitEdit(estimate) {
    await this.onSubmitEdit(estimate)
    await this.handleCancelEdit()
  }

  async handleSubmitReset() {
    await this.onSubmitReset(this.estimate)
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.estimateEditStateChange()
    this.setState({
      isEditing: false,
      isEditStateChanging: false
    })
  }

  render() {
    return (
      <div className={`Estimate ${this.isEditingClassName} ${this.className}`}>
        <div className={`Estimate_body ${this.editStateChangingClassName}`}>
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
        onSubmit={estimate => this.handleSubmitNew(estimate)}
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
