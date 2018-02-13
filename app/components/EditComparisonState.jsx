import React from "react"

export default class EditComparisonState extends React.Component {
  constructor({ comparison }) {
    super()
    this.state = {
      name: comparison.name,
      alternative_noun: comparison.alternative_noun || "",
      value_unit: comparison.value_unit || ""
    }
  }

  get renderProp() {
    return this.props.render
  }

  get onSubmit() {
    return this.props.onSubmit
  }

  get onCancel() {
    return this.props.onCancel
  }

  get name() {
    return this.state.name
  }

  get alternative_noun() {
    return this.state.alternative_noun
  }

  get value_unit() {
    return this.state.value_unit
  }

  handleChangeName(event) {
    this.setState({
      name: event.target.value
    })
  }

  handleChangeAlternativeNoun(event) {
    this.setState({
      alternative_noun: event.target.value
    })
  }

  handleChangeValueUnit(event) {
    this.setState({
      value_unit: event.target.value
    })
  }

  render() {
    return this.renderProp({
      name: this.name,
      alternative_noun: this.alternative_noun,
      value_unit: this.value_unit,
      onChangeName: event => this.handleChangeName(event),
      onChangeAlternativeNoun: event => this.handleChangeAlternativeNoun(event),
      onChangeValueUnit: event => this.handleChangeValueUnit(event)
    })
  }
}
