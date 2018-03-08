import React from "react"

import Timing from "Timing"

export default class AlternativeIndexState extends React.Component {
  constructor() {
    super()
    this.state = {
      isAlternativeNewlyCreated: false
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

  get isAlternativeNewlyCreated() {
    return this.state.isAlternativeNewlyCreated
  }

  async handleSubmitNewAlternative(alternative) {
    console.log("Posting new alternative", alternative)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/alternatives`,
      alternative
    )
    this.onSetComparisonState({
      alternatives: [response.data].concat(this.comparison.alternatives)
    })
    this.animateNewAlternative()
  }

  async animateNewAlternative() {
    this.setState({
      isAlternativeNewlyCreated: true
    })
    await Timing.alternativeIndexHighlightLink()
    this.setState({
      isAlternativeNewlyCreated: false
    })
  }

  render() {
    return this.renderProp({
      isAlternativeNewlyCreated: this.isAlternativeNewlyCreated,
      onSubmitNewAlternative: alternative =>
        this.handleSubmitNewAlternative(alternative)
    })
  }
}
