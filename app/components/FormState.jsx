import React from "react"

import { entries, fromEntries } from "Utils"

export default class FormState extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.createInputState(this.input)
  }

  get input() {
    return this.props.input
  }

  get fields() {
    return this.props.fields
  }

  get renderProp() {
    return this.props.render
  }

  createInputState(object) {
    return this.mapFields((fieldName, fieldType) =>
      fieldType.input(object[fieldName])
    )
  }

  createFieldObjects() {
    return this.mapFields((fieldName, fieldType) =>
      this.createField(fieldName, fieldType)
    )
  }

  mapFields(transform) {
    return fromEntries(
      entries(this.fields).map(([fieldName, fieldType]) => [
        fieldName,
        transform(fieldName, fieldType)
      ])
    )
  }

  createField(name, type) {
    const value = this.state[name]
    return {
      name,
      value,
      output: () => type.output(value),
      onChange: event => this.handleChangeField(event, name)
    }
  }

  handleChangeField(event, name) {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    return this.renderProp({ fields: this.createFieldObjects() })
  }
}
