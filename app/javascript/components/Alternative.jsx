import React from "react"
import { Link } from "react-router-dom"
import EditAlternative from "./EditAlternative"
import Estimate from "./Estimate"
import NewEstimate from "./NewEstimate"

class Alternative extends React.Component {
  constructor({
    match,
    comparisonMatchUrl,
    onSubmitEditAlternative,
    onSubmitNewEstimate
  }) {
    super()
    const { params: { id: stringId }, url: matchUrl } = match
    this.state = {
      id: parseInt(stringId),
      matchUrl,
      comparisonMatchUrl,
      isEditing: false,
      onSubmitEditAlternative,
      onSubmitNewEstimate
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

  get missingCriteria() {
    const presentCriteria = this.alternative.estimates.map(
      item => item.criterion_id
    )
    return this.criteria.filter(
      criterion => presentCriteria.indexOf(criterion.id) < 0
    )
  }

  async handleSubmitNewEstimate(estimate) {
    await this.state.onSubmitNewEstimate(this.alternative, estimate)
  }

  handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditing: true
    })
  }

  async handleSubmitEdit(alternative) {
    await this.state.onSubmitEditAlternative(alternative)
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
        {this.renderEstimates()}
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
        {this.missingCriteria.map(criterion =>
          this.renderNewEstimate(criterion)
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
        <Estimate estimate={estimate} criterion={criterion} />
      </li>
    )
  }

  renderNewEstimate(criterion) {
    return (
      <li key={criterion.id}>
        <NewEstimate
          criterion={criterion}
          onSubmit={estimate => this.handleSubmitNewEstimate(estimate)}
        />
      </li>
    )
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
