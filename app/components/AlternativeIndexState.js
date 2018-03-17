import StateComponent from "StateComponent"

export default class AlternativeIndexState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(AlternativeIndexState)

  constructor(props) {
    super(props)
    this.state = {
      newlyCreatedItems: []
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

  get newlyCreatedItems() {
    return this.state.newlyCreatedItems
  }

  componentDidMount() {
    this.setState({
      newlyCreatedItems: []
    })
  }

  async handleSubmitNewAlternative(alternative) {
    console.log("Posting new alternative", alternative)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/alternatives`,
      alternative
    )
    this.onSetComparisonState({
      alternatives: this.comparison.alternatives.concat([response.data])
    })
    this.setState({
      newlyCreatedItems: this.newlyCreatedItems.concat([response.data])
    })
  }

  renderState() {
    return {
      newlyCreatedItems: this.newlyCreatedItems,
      onSubmitNewAlternative: alternative =>
        this.handleSubmitNewAlternative(alternative)
    }
  }
}
