import React from "react"
import { Link } from "react-router-dom"
import EditAlternative from "./EditAlternative"

class Alternative extends React.Component {
  constructor({ match, comparisonMatchUrl, onSubmitEdit }) {
    super()
    const { params: { id: stringId }, url: matchUrl } = match
    this.state = {
      id: parseInt(stringId),
      matchUrl,
      comparisonMatchUrl,
      isEditing: false,
      onSubmitEdit
    }
  }

  get alternatives() {
    return this.props.alternatives
  }

  get alternative() {
    return this.alternatives.find(item => item.id === this.state.id)
  }

  get criteria() {
    return this.props.criteria
  }

  handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditing: true
    })
  }

  async handleSubmitEdit(alternative) {
    await this.state.onSubmitEdit(alternative)
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
      <div>
        {this.renderHeader()}
        {this.alternative.estimates.length
          ? this.renderEstimates()
          : this.renderNoEstimates()}
        {this.renderCriteriaLink()}
      </div>
    )
  }

  renderHeader() {
    if (!this.state.isEditing) {
      return (
        <h3>
          <Link to={this.state.matchUrl}>{this.alternative.name}</Link>{" "}
          {this.alternative.url && (
            <a href={this.alternative.url} target="_blank">
              (external link)
            </a>
          )}{" "}
          <button onClick={() => this.handleBeginEdit()}>Edit</button>
        </h3>
      )
    } else {
      return (
        <EditAlternative
          alternative={this.alternative}
          onSubmit={alternative => this.handleSubmitEdit(alternative)}
          onCancel={() => this.handleCancelEdit()}
        />
      )
    }
  }

  renderEstimates() {
    return (
      <ul>
        {this.alternative.estimates.map(estimate =>
          this.renderEstimate(estimate)
        )}
      </ul>
    )
  }

  renderEstimate(estimate) {
    const criterion = this.criteria.find(
      item => item.id === estimate.criterion_id
    )
    return (
      <li key={estimate.id}>
        {criterion.name}: {estimate.estimate}
      </li>
    )
  }

  renderNoEstimates() {
    return <p>No estimates yet</p>
  }

  renderCriteriaLink() {
    return (
      <h3>
        <Link to={`${this.state.comparisonMatchUrl}/criteria`}>Criteria</Link>
      </h3>
    )
  }
}

export default Alternative
