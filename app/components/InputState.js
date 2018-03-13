import StateComponent from "StateComponent"

export default class InputState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(InputState)

  constructor(props) {
    super(props)
    this.state = {
      hasFocus: false
    }
  }

  get hasFocus() {
    return this.state.hasFocus
  }

  handleFocus() {
    this.setState({
      hasFocus: true
    })
  }

  handleBlur() {
    this.setState({
      hasFocus: false
    })
  }

  renderState() {
    return {
      hasFocus: this.hasFocus,
      onFocus: () => this.handleFocus(),
      onBlur: () => this.handleBlur()
    }
  }
}
