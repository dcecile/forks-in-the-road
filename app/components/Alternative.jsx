import React from "react"
import ComparisonHeader from "ComparisonHeader"
import EditAlternative from "EditAlternative"
import Estimate from "Estimate"
import NewEstimate from "NewEstimate"

class Alternative extends React.Component {
  constructor() {
    super()
    this.state = {
      isEditing: false
    }
  }

  get id() {
    return parseInt(this.props.match.params.id)
  }

  get matchUrl() {
    return this.props.match.url
  }

  get parentMatchUrl() {
    return this.props.parentMatchUrl
  }

  get parentTitle() {
    return this.props.parentTitle
  }

  get comparisonMatchUrl() {
    return this.props.comparisonMatchUrl
  }

  get onSubmitEditEstimate() {
    return this.props.onSubmitEditEstimate
  }

  get onSubmitNewEstimate() {
    return this.props.onSubmitNewEstimate
  }

  get onSubmitEditAlternative() {
    return this.props.onSubmitEditAlternative
  }

  get alternatives() {
    return this.props.alternatives
  }

  get alternative() {
    return this.alternatives.find(item => item.id === this.id)
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

  get isEditing() {
    return this.state.isEditing
  }

  async handleSubmitNewEstimate(estimate) {
    await this.onSubmitNewEstimate(this.alternative, estimate)
  }

  async handleSubmitEditEstimate(estimate) {
    await this.onSubmitEditEstimate(this.alternative, estimate)
  }

  handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditing: true
    })
  }

  async handleSubmitEdit(alternative) {
    await this.onSubmitEditAlternative(alternative)
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
        {this.renderSubHeader()}
        {this.renderEstimates()}
      </div>
    )
  }

  renderHeader() {
    return (
      <ComparisonHeader
        matchUrl={this.matchUrl}
        title={this.alternative.name}
        parentMatchUrl={this.parentMatchUrl}
        parentTitle={this.parentTitle}
      />
    )
  }

  renderSubHeader() {
    if (!this.isEditing) {
      return (
        <h2>
          {this.alternative.url && (
            <a href={this.alternative.url} target="_blank">
              (external link)
            </a>
          )}{" "}
          <button onClick={() => this.handleBeginEdit()}>Edit</button>
        </h2>
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
        <Estimate
          estimate={estimate}
          criterion={criterion}
          onSubmitEdit={estimate => this.handleSubmitEditEstimate(estimate)}
        />
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
}

export default Alternative
