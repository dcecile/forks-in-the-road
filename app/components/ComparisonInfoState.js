import EditableStateComponent from "EditableStateComponent"
import Timing from "Timing"

export default class ComparisonState extends EditableStateComponent {
  static renderWith = EditableStateComponent.renderWithComponent(
    ComparisonState
  )

  constructor(props) {
    super(props)
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

  get editStateChangeTiming() {
    return Timing.comparisonInfoEditStateChange
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

  renderEditableState() {
    return {
      onSubmitEdit: comparison => this.handleSubmitEdit(comparison)
    }
  }
}
