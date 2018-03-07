import React from "react"

export default class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      hasFocus: false
    }
  }

  get field() {
    return this.props.field
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

  render() {
    return this.renderProps({
      ...this.props,
      value: this.field.value,
      onChange: this.field.onChange
    })
  }

  renderProps({
    className,
    type,
    required,
    placeholder,
    value,
    min,
    max,
    onChange
  }) {
    return (
      <input
        onFocus={() => this.handleFocus()}
        onBlur={() => this.handleBlur()}
        placeholder={this.hasFocus ? null : placeholder}
        {...{ className, type, required, value, min, max, onChange }}
      />
    )
  }
}
