import StateComponent from "StateComponent"

export default class AlternativeIndexState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(AlternativeIndexState)

  constructor(props) {
    super(props)
    this.state = {
      newlyCreatedItem: null
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

  get newlyCreatedItem() {
    return this.state.newlyCreatedItem
  }

  componentDidMount() {
    this.setState({
      newlyCreatedItem: null
    })
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
    this.setState({
      newlyCreatedItem: response.data
    })
  }

  renderState() {
    return {
      newlyCreatedItem: this.newlyCreatedItem,
      onSubmitNewAlternative: alternative =>
        this.handleSubmitNewAlternative(alternative)
    }
  }
}
