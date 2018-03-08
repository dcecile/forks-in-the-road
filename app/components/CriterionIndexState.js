import React from "react"

import Timing from "Timing"

export default class CriterionIndexState extends React.Component {
  constructor() {
    super()
    this.state = {
      isCriterionNewlyCreated: false
    }
  }

  get comparison() {
    return this.props.comparison
  }

  get server() {
    return this.props.server
  }

  get onSetComparisonState() {
    return this.props.onSetComparisonState
  }

  get renderProp() {
    return this.props.render
  }

  get isCriterionNewlyCreated() {
    return this.state.isCriterionNewlyCreated
  }

  async handleSubmitNewCriterion(criterion) {
    console.log("Posting new criterion", criterion)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/criteria`,
      criterion
    )
    this.onSetComparisonState({
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
    this.onSetComparisonState({
      criteria: this.comparison.criteria.map(
        item =>
          item.id === criterion.id ? { ...item, ...response.data } : item
      )
    })
  }

  render() {
    return this.renderProp({
      isCriterionNewlyCreated: this.isCriterionNewlyCreated,
      onSubmitNewCriterion: criterion =>
        this.handleSubmitNewCriterion(criterion),
      onSubmitEditCriterion: criterion =>
        this.handleSubmitEditCriterion(criterion)
    })
  }
}
