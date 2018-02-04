import React from "react"
import EditCriterion from "EditCriterion"
import Button from "Button"
import Timing from "Timing"

export default class Criterion extends React.Component {
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

  get criterion() {
    return this.props.criterion
  }

  get onSubmitEdit() {
    return this.props.onSubmitEdit
  }

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  get editStateChangingClassName() {
    return this.isEditStateChanging
      ? "Criterion_transform__isEditChangingState"
      : ""
  }

  async handleBeginEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.criterionEditStateChange()
    this.setState({
      isEditing: true,
      isEditStateChanging: false
    })
  }

  async handleSubmitEdit(criterion) {
    await this.onSubmitEdit(criterion)
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.criterionEditStateChange()
    this.setState({
      isEditing: false,
      isEditStateChanging: false
    })
  }

  render() {
    return (
      <div className={`Criterion ${this.className}`}>
        <div
          className={`Criterion_transform ${this.editStateChangingClassName}`}
        >
          {!this.isEditing ? this.renderShow() : this.renderEdit()}
        </div>
      </div>
    )
  }

  renderShow() {
    return (
      <div className="Criterion_body">
        <h2 className="Criterion_name">{this.criterion.name} </h2>
        <p className="Criterion_description">{this.criterion.description}</p>
        <ul>
          {this.renderDetail("Full value", this.criterion.full_value)}
          {this.renderDetail(
            "Default estimate",
            this.criterion.default_estimate
          )}
        </ul>
        <Button
          className="Criterion_editButton"
          onClick={() => this.handleBeginEdit()}
        >
          Edit
        </Button>
      </div>
    )
  }

  renderDetail(text, detail) {
    return detail !== null ? (
      <li>
        {text}: {detail}
      </li>
    ) : null
  }

  renderEdit() {
    return (
      <EditCriterion
        criterion={this.criterion}
        onSubmit={criterion => this.handleSubmitEdit(criterion)}
        onCancel={() => this.handleCancelEdit()}
      />
    )
  }
}
