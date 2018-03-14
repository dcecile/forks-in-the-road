import StateComponent from "StateComponent"
import Timing from "Timing"

export default class AlternativeIndexState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(AlternativeIndexState)

  constructor(props) {
    super(props)
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
    this.setStateTemporarily(
      { isAlternativeNewlyCreated: true },
      Timing.alternativeIndexHighlightLink
    )
  }

  renderState() {
    return {
      isAlternativeNewlyCreated: this.isAlternativeNewlyCreated,
      onSubmitNewAlternative: alternative =>
        this.handleSubmitNewAlternative(alternative)
    }
  }
}
