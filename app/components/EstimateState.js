import EditableStateComponent from "EditableStateComponent"
import Timing from "Timing"

export default class EstimateState extends EditableStateComponent {
  static renderWith = EditableStateComponent.renderWithComponent(EstimateState)

  constructor(props) {
    super(props)
  }

  get estimate() {
    return this.props.estimate
  }

  get onSubmitNew() {
    return this.props.onSubmitNew
  }

  get onSubmitEdit() {
    return this.props.onSubmitEdit
  }

  get onSubmitReset() {
    return this.props.onSubmitReset
  }

  get editStateChangeTiming() {
    return Timing.estimateEditStateChange
  }

  async handleSubmitNew(estimate) {
    await this.onSubmitNew(estimate)
  }

  async handleSubmitEdit(estimate) {
    await this.onSubmitEdit(estimate)
    await this.handleCancelEdit()
  }

  async handleSubmitReset() {
    await this.onSubmitReset(this.estimate)
    await this.handleCancelEdit()
  }

  renderEditableState() {
    return {
      onSubmitNew: estimate => this.handleSubmitNew(estimate),
      onSubmitEdit: estimate => this.handleSubmitEdit(estimate),
      onSubmitReset: () => this.handleSubmitReset()
    }
  }
}
