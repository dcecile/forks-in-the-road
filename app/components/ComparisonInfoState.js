import React from "react"

import Timing from "Timing"

export default class ComparisonState extends React.Component {
  constructor() {
    super()
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

  get renderProp() {
    return this.props.render
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
    await Timing.comparisonInfoEditStateChange()
    this.setState({
      isEditing: true,
      isEditStateChanging: false
    })
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
    this.setState({
      isEditStateChanging: true
    })
    await Timing.comparisonInfoEditStateChange()
    this.setState({
      isEditing: false,
      isEditStateChanging: false
    })
  }

  render() {
    return this.renderProp({
      isEditing: this.isEditing,
      isEditStateChanging: this.isEditStateChanging,
      onBeginEdit: () => this.handleBeginEdit(),
      onSubmitEdit: comparison => this.handleSubmitEdit(comparison),
      onCancelEdit: () => this.handleCancelEdit()
    })
  }
}
