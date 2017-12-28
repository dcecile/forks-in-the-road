import React from "react"

class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      hasFocus: false
    }
  }

  get hasFocus() {
    return this.state.hasFocus
  }

  handleFocus() {
    this.setState({
      ...this.state,
      hasFocus: true
    })
  }

  handleBlur() {
    this.setState({
      ...this.state,
      hasFocus: false
    })
  }

  render() {
    return this.renderProps(this.props)
  }

  renderProps({ className, type, required, placeholder, value, onChange }) {
    const props = { className, type, required, value, onChange }
    return (
      <input
        onFocus={() => this.handleFocus()}
        onBlur={() => this.handleBlur()}
        placeholder={this.hasFocus ? null : placeholder}
        {...props}
      />
    )
  }
}

export default Input
