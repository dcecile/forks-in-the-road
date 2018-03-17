import StateComponent from "StateComponent"
import { entries, fromEntries } from "Utils"

export default class FormState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(FormState)

  constructor(props) {
    super(props)
    this.state = this.input
      ? this.createInputState(this.input)
      : this.createInitState()
  }

  get input() {
    return this.props.input
  }

  get fields() {
    return this.props.fields
  }

  createInputState(object) {
    return this.mapFields((fieldName, fieldType) =>
      fieldType.input(object[fieldName])
    )
  }

  createInitState() {
    return this.mapFields(() => "")
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

  handleReinit() {
    this.setState(this.createInitState())
    this.formElement.querySelector("input").focus()
  }

  renderState() {
    return {
      fields: this.createFieldObjects(),
      onFormRef: formElement => (this.formElement = formElement),
      onReinitForm: () => this.handleReinit()
    }
  }
}
