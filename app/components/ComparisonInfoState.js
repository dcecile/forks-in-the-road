import StateComponent from "StateComponent"
import Timing from "Timing"

export default class ComparisonState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(ComparisonState)

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      isEditStateChanging: false
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

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  async handleBeginEdit() {
    await this.setStateTemporarily(
      { isEditStateChanging: true },
      Timing.comparisonInfoEditStateChange
    )
    this.setState({ isEditing: true })
  }

  async handleSubmitEdit(comparison) {
    console.log("Patching comparison", comparison)
    const response = await this.server.patch(
      `/comparisons/${this.comparison.id}`,
      comparison
    )
    this.onSetComparisonState(response.data)
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    await this.setStateTemporarily(
      { isEditStateChanging: true },
      Timing.comparisonInfoEditStateChange
    )
    this.setState({ isEditing: false })
  }

  renderState() {
    return {
      isEditing: this.isEditing,
      isEditStateChanging: this.isEditStateChanging,
      onBeginEdit: () => this.handleBeginEdit(),
      onSubmitEdit: comparison => this.handleSubmitEdit(comparison),
      onCancelEdit: () => this.handleCancelEdit()
    }
  }
}
