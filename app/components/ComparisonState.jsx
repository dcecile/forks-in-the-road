import React from "react"

import ComparisonRender from "ComparisonRender"
import Timing from "Timing"

export default class ComparisonState extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isEditing: false,
      isEditStateChanging: false,
      isAlternativeNewlyCreated: false,
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

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  get isAlternativeNewlyCreated() {
    return this.state.isAlternativeNewlyCreated
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
      handleBeginEdit: () => this.handleBeginEdit(),
      handleCancelEdit: () => this.handleCancelEdit(),
      handleSubmitEdit: comparison => this.handleSubmitEdit(comparison),
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

  async handleSubmitNewAlternative(alternative) {
    console.log("Posting new alternative", alternative)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/alternatives`,
      alternative
    )
    this.setComparisonState({
      alternatives: [response.data].concat(this.comparison.alternatives)
    })
    this.setState({
      isAlternativeNewlyCreated: true
    })
    await Timing.comparisonAlternativesHighlightLink()
    this.setState({
      isAlternativeNewlyCreated: false
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
    this.setState({
      isCriterionNewlyCreated: true
    })
    await Timing.comparisonCriteriaPopIn()
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

  async handleBeginEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.comparisonEditStateChange()
    this.setState({
      isEditing: true,
      isEditStateChanging: false
    })
  }

  async handleSubmitEdit(comparison) {
    console.log("Patching comparison", comparison)
    const response = await this.server.patch(
      `/comparisons/${this.comparison.id}`,
      comparison
    )
    this.setComparisonState(response.data)
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.comparisonEditStateChange()
    this.setState({
      isEditing: false,
      isEditStateChanging: false
    })
  }

  render() {
    return (
      <ComparisonRender
        className={this.className}
        comparison={this.comparison}
        handlers={this.handlers}
        isAlternativeNewlyCreated={this.isAlternativeNewlyCreated}
        isCriterionNewlyCreated={this.isCriterionNewlyCreated}
        isEditStateChanging={this.isEditStateChanging}
        isEditing={this.isEditing}
        isLoading={this.isLoading}
        location={this.location}
        matchUrl={this.matchUrl}
      />
    )
  }
}
