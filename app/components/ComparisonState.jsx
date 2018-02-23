import React from "react"

import ComparisonRender from "ComparisonRender"
import Timing from "Timing"

export default class ComparisonState extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isCriterionNewlyCreated: false,
      comparison: null
    }
  }

  get className() {
    return this.props.className
  }

  get server() {
    return this.props.server
  }

  get match() {
    return this.props.match
  }

  get location() {
    return this.props.location
  }

  get isLoading() {
    return this.state.isLoading
  }

  get isCriterionNewlyCreated() {
    return this.state.isCriterionNewlyCreated
  }

  get comparison() {
    return this.state.comparison
  }

  get matchUrl() {
    return this.match.url
  }

  get handlers() {
    return {
      handleSubmitEditAlternative: alternative =>
        this.handleSubmitEditAlternative(alternative),
      handleSubmitEditCriterion: criterion =>
        this.handleSubmitEditCriterion(criterion),
      handleSubmitEditEstimate: (alternative, estimate) =>
        this.handleSubmitEditEstimate(alternative, estimate),
      handleSubmitNewAlternative: alternative =>
        this.handleSubmitNewAlternative(alternative),
      handleSubmitNewCriterion: criterion =>
        this.handleSubmitNewCriterion(criterion),
      handleSubmitNewEstimate: (alternative, estimate) =>
        this.handleSubmitNewEstimate(alternative, estimate),
      handleSubmitResetEstimate: (alternative, estimate) =>
        this.handleSubmitResetEstimate(alternative, estimate)
    }
  }

  setComparisonState(comparisonChanges) {
    this.setState({
      comparison: {
        ...this.comparison,
        ...comparisonChanges
      }
    })
  }

  setAlternativeState(alternativeID, alternativeChanges) {
    this.setComparisonState({
      alternatives: this.comparison.alternatives.map(
        item =>
          item.id === alternativeID ? { ...item, ...alternativeChanges } : item
      )
    })
  }

  componentDidMount() {
    const { params: { id } } = this.match
    this.load(id)
  }

  async load(id) {
    console.log("Getting comparison")
    const response = await this.server.get(`/comparisons/${id}`)
    this.setState({
      isLoading: false,
      comparison: response.data
    })
  }

  async handleSubmitEditAlternative(alternative) {
    console.log("Patching alternative", alternative)
    const response = await this.server.patch(
      `/alternatives/${alternative.id}`,
      alternative
    )
    this.setAlternativeState(alternative.id, response.data)
  }

  async handleSubmitNewCriterion(criterion) {
    console.log("Posting new criterion", criterion)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/criteria`,
      criterion
    )
    this.setComparisonState({
      criteria: this.comparison.criteria.concat(response.data)
    })
    this.animateNewCriterion()
  }

  async animateNewCriterion() {
    this.setState({
      isCriterionNewlyCreated: true
    })
    await Timing.criterionIndexPopIn()
    this.setState({
      isCriterionNewlyCreated: false
    })
  }

  async handleSubmitEditCriterion(criterion) {
    console.log("Patching criterion", criterion)
    const response = await this.server.patch(
      `/criteria/${criterion.id}`,
      criterion
    )
    this.setComparisonState({
      criteria: this.comparison.criteria.map(
        item =>
          item.id === criterion.id ? { ...item, ...response.data } : item
      )
    })
  }

  async handleSubmitNewEstimate(alternative, estimate) {
    console.log("Posting new estimate", estimate)
    const response = await this.server.post(
      `/alternatives/${alternative.id}/estimates`,
      estimate
    )
    this.setAlternativeState(alternative.id, {
      estimates: alternative.estimates.concat(response.data)
    })
  }

  async handleSubmitEditEstimate(alternative, estimate) {
    console.log("Patching estimate", estimate)
    const response = await this.server.patch(
      `/estimates/${estimate.id}`,
      estimate
    )
    this.setAlternativeState(alternative.id, {
      estimates: alternative.estimates.map(
        item => (item.id === estimate.id ? { ...item, ...response.data } : item)
      )
    })
  }

  async handleSubmitResetEstimate(alternative, estimate) {
    console.log("Deleting estimate", estimate)
    await this.server.delete(`/estimates/${estimate.id}`)
    this.setAlternativeState(alternative.id, {
      estimates: alternative.estimates.filter(item => item.id !== estimate.id)
    })
  }

  render() {
    return (
      <ComparisonRender
        className={this.className}
        comparison={this.comparison}
        handlers={this.handlers}
        isCriterionNewlyCreated={this.isCriterionNewlyCreated}
        isLoading={this.isLoading}
        location={this.location}
        matchUrl={this.matchUrl}
        server={this.server}
        onSetComparisonState={comparisonChanges =>
          this.setComparisonState(comparisonChanges)
        }
      />
    )
  }
}
