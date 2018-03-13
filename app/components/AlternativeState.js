import StateComponent from "StateComponent"

export default class Alternative extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(Alternative)

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
  }

  get match() {
    return this.props.match
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

  get id() {
    return parseInt(this.match.params.id)
  }

  get alternatives() {
    return this.comparison.alternatives
  }

  get alternative() {
    return this.alternatives.find(item => item.id === this.id)
  }

  get isEditing() {
    return this.state.isEditing
  }

  handleBeginEdit() {
    this.setState({
      isEditing: true
    })
  }

  async handleSubmitEdit(alternative) {
    console.log("Patching alternative", alternative)
    const response = await this.server.patch(
      `/alternatives/${alternative.id}`,
      alternative
    )
    this.setAlternativeState(response.data)
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      isEditing: false
    })
  }

  async handleSubmitNewEstimate(estimate) {
    console.log("Posting new estimate", estimate)
    const response = await this.server.post(
      `/alternatives/${this.alternative.id}/estimates`,
      estimate
    )
    this.setAlternativeState({
      estimates: this.alternative.estimates.concat(response.data)
    })
  }

  async handleSubmitEditEstimate(estimate) {
    console.log("Patching estimate", estimate)
    const response = await this.server.patch(
      `/estimates/${estimate.id}`,
      estimate
    )
    this.setAlternativeState({
      estimates: this.alternative.estimates.map(
        item => (item.id === estimate.id ? { ...item, ...response.data } : item)
      )
    })
  }

  async handleSubmitResetEstimate(estimate) {
    console.log("Deleting estimate", estimate)
    await this.server.delete(`/estimates/${estimate.id}`)
    this.setAlternativeState({
      estimates: this.alternative.estimates.filter(
        item => item.id !== estimate.id
      )
    })
  }

  setAlternativeState(alternativeChanges) {
    this.onSetComparisonState({
      alternatives: this.alternatives.map(
        item =>
          item.id === this.alternative.id
            ? { ...item, ...alternativeChanges }
            : item
      )
    })
  }

  renderState() {
    return {
      alternative: this.alternative,
      isEditing: this.isEditing,
      onBeginEdit: () => this.handleBeginEdit(),
      onSubmitEdit: alternative => this.handleSubmitEdit(alternative),
      onCancelEdit: () => this.handleCancelEdit(),
      onSubmitEditEstimate: estimate => this.handleSubmitEditEstimate(estimate),
      onSubmitNewEstimate: estimate => this.handleSubmitNewEstimate(estimate),
      onSubmitResetEstimate: estimate =>
        this.handleSubmitResetEstimate(estimate)
    }
  }
}
