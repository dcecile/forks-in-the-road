import escapeStringRegExp from "escape-string-regexp"

import StateComponent from "StateComponent"

export default class AlternativeIndexState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(AlternativeIndexState)

  constructor(props) {
    super(props)
    this.state = {
      matchingItems: [],
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

  get matchingItems() {
    return this.state.matchingItems
  }

  get newlyCreatedItems() {
    return this.state.newlyCreatedItems
  }

  get alternatives() {
    return this.comparison.alternatives
  }

  componentDidMount() {
    this.setState({
      newlyCreatedItems: []
    })
  }

  handleNewAlternativeNameChange(event) {
    const newName = event.target.value
    if (newName.length > 1) {
      const newNameRegExp = new RegExp(`^${escapeStringRegExp(newName)}`, "i")
      this.setState({
        matchingItems: this.alternatives.filter(alternative =>
          newNameRegExp.test(alternative.name)
        )
      })
    } else {
      this.setState({
        matchingItems: []
      })
    }
  }

  async handleSubmitNewAlternative(alternative) {
    console.log("Posting new alternative", alternative)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/alternatives`,
      alternative
    )
    this.onSetComparisonState({
      alternatives: this.alternatives.concat([response.data])
    })
    this.setState({
      matchingItems: [],
      newlyCreatedItems: this.newlyCreatedItems.concat([response.data])
    })
  }

  renderState() {
    return {
      matchingItems: this.matchingItems,
      newlyCreatedItems: this.newlyCreatedItems,
      onNewAlternativeNameChange: event =>
        this.handleNewAlternativeNameChange(event),
      onSubmitNewAlternative: alternative =>
        this.handleSubmitNewAlternative(alternative)
    }
  }
}
