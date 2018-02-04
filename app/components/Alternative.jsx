import React from "react"
import MdOpenInNew from "react-icons/lib/md/open-in-new"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import ComparisonHeader from "ComparisonHeader"
import EditAlternative from "EditAlternative"
import Estimate from "Estimate"
import Button from "Button"
import Timing from "Timing"

export default class Alternative extends React.Component {
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

  get onSubmitResetEstimate() {
    return this.props.onSubmitResetEstimate
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

  get isEditing() {
    return this.state.isEditing
  }

  findEstimate(criterion) {
    return this.alternative.estimates.find(
      estimate => estimate.criterion_id === criterion.id
    )
  }

  async handleSubmitNewEstimate(estimate) {
    await this.onSubmitNewEstimate(this.alternative, estimate)
  }

  async handleSubmitEditEstimate(estimate) {
    await this.onSubmitEditEstimate(this.alternative, estimate)
  }

  async handleSubmitResetEstimate(estimate) {
    await this.onSubmitResetEstimate(this.alternative, estimate)
  }

  handleBeginEdit() {
    this.setState({
      isEditing: true
    })
  }

  async handleSubmitEdit(alternative) {
    await this.onSubmitEditAlternative(alternative)
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      isEditing: false
    })
  }

  render() {
    return (
      <div className="Alternative">
        <TransitionGroup>
          <CSSTransition
            key={!this.isEditing}
            classNames="Alternative_headerTransition"
            timeout={{
              exit: Timing.alternativeEditStateChange,
              enter: Timing.alternativeEditStateChange * 2
            }}
          >
            {!this.isEditing ? this.renderHeaders() : this.renderEdit()}
          </CSSTransition>
        </TransitionGroup>
        {this.renderEstimates()}
      </div>
    )
  }

  renderHeaders() {
    return (
      <div className="Alternative_headers">
        {this.renderHeader()}
        {this.renderSubHeader()}
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
      >
        <Button
          className="Alternative_editButton"
          onClick={() => this.handleBeginEdit()}
        >
          Edit
        </Button>
      </ComparisonHeader>
    )
  }

  renderSubHeader() {
    return (
      this.alternative.url && (
        <h2 className="Alternative_subHeader">
          <a href={this.alternative.url} target="_blank">
            (external link){" "}
            <MdOpenInNew className="Alternative_externalLinkIcon" />
          </a>
        </h2>
      )
    )
  }

  renderEdit() {
    return (
      <EditAlternative
        className="Alternative_edit"
        alternative={this.alternative}
        onSubmit={alternative => this.handleSubmitEdit(alternative)}
        onCancel={() => this.handleCancelEdit()}
      />
    )
  }

  renderEstimates() {
    return this.criteria.map(criterion =>
      this.renderEstimate(criterion, this.findEstimate(criterion))
    )
  }

  renderEstimate(criterion, estimate) {
    return (
      <Estimate
        key={criterion.id}
        className="Alternative_item"
        estimate={estimate}
        criterion={criterion}
        onSubmitNew={estimate => this.handleSubmitNewEstimate(estimate)}
        onSubmitEdit={estimate => this.handleSubmitEditEstimate(estimate)}
        onSubmitReset={estimate => this.handleSubmitResetEstimate(estimate)}
      />
    )
  }
}
