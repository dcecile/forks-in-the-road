import StateComponent from "StateComponent"
import Timing from "Timing"

export default class CriterionState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(CriterionState)

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      isEditStateChanging: false
    }
  }

  get onSubmitEdit() {
    return this.props.onSubmitEdit
  }

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  async handleBeginEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.criterionEditStateChange()
    this.setState({
      isEditing: true,
      isEditStateChanging: false
    })
  }

  async handleSubmitEdit(criterion) {
    await this.onSubmitEdit(criterion)
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.criterionEditStateChange()
    this.setState({
      isEditing: false,
      isEditStateChanging: false
    })
  }

  renderState() {
    return {
      isEditing: this.isEditing,
      isEditStateChanging: this.isEditStateChanging,
      onBeginEdit: () => this.handleBeginEdit(),
      onSubmitEdit: criterion => this.handleSubmitEdit(criterion),
      onCancelEdit: () => this.handleCancelEdit()
    }
  }
}
