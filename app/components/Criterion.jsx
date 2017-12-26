import React from "react"
import EditCriterion from "EditCriterion"

class Criterion extends React.Component {
  constructor({ onSubmitEdit }) {
    super()
    this.state = {
      onSubmitEdit,
      isEditing: false
    }
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

  async handleSubmitEdit(criterion) {
    await this.state.onSubmitEdit(criterion)
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  }

  render() {
    return !this.state.isEditing ? this.renderShow() : this.renderEdit()
  }

  renderShow() {
    return (
      <div>
        {this.criterion.name}{" "}
        <button onClick={() => this.handleBeginEdit()}>Edit</button>
        {this.renderDetails()}
      </div>
    )
  }

  renderDetails() {
    return (
      <ul>
        {[
          this.criterion.description,
          this.criterion.full_value,
          this.criterion.default_estimate
        ].map((detail, i) => this.renderDetail(detail, i))}
      </ul>
    )
  }

  renderDetail(detail, i) {
    return detail !== null ? <li key={i}>{detail}</li> : null
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

export default Criterion
