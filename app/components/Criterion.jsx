import React from "react"
import EditCriterion from "EditCriterion"
import Button from "Button"

class Criterion extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
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

  handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditing: true
    })
  }

  async handleSubmitEdit(criterion) {
    await this.onSubmitEdit(criterion)
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  }

  render() {
    return !this.isEditing ? this.renderShow() : this.renderEdit()
  }

  renderShow() {
    return (
      <div className={`${this.className} Criterion`}>
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
        className={this.className}
        criterion={this.criterion}
        onSubmit={criterion => this.handleSubmitEdit(criterion)}
        onCancel={() => this.handleCancelEdit()}
      />
    )
  }
}

export default Criterion
