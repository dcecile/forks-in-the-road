import EditableStateComponent from "EditableStateComponent"
import Timing from "Timing"

export default class CriterionState extends EditableStateComponent {
  static renderWith = EditableStateComponent.renderWithComponent(CriterionState)

  constructor(props) {
    super(props)
  }

  get onSubmitEdit() {
    return this.props.onSubmitEdit
  }

  get editStateChangeTiming() {
    return Timing.criterionEditStateChange
  }

  async handleSubmitEdit(criterion) {
    await this.onSubmitEdit(criterion)
    await this.handleCancelEdit()
  }

  renderEditableState() {
    return {
      onSubmitEdit: criterion => this.handleSubmitEdit(criterion)
    }
  }
}
