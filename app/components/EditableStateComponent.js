import StateComponent from "StateComponent"

export default class EditableStateComponent extends StateComponent {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      isEditStateChanging: false
    }
  }

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  async handleChangeEditing(isEditing) {
    await this.setStateTemporarily(
      { isEditStateChanging: true },
      this.editStateChangeTiming
    )
    this.setState({ isEditing })
  }

  async handleBeginEdit() {
    await this.handleChangeEditing(true)
  }

  async handleCancelEdit() {
    await this.handleChangeEditing(false)
  }

  renderState() {
    return {
      isEditing: this.isEditing,
      isEditStateChanging: this.isEditStateChanging,
      onBeginEdit: () => this.handleBeginEdit(),
      onCancelEdit: () => this.handleCancelEdit(),
      ...this.renderEditableState()
    }
  }
}
