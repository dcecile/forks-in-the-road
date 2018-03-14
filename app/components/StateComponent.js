import React from "react"

export default class StateComponent extends React.Component {
  /* eslint-disable react/display-name */
  static renderWithComponent = State => (render, fixedProps) => props =>
    React.createElement(State, {
      ...props,
      ...fixedProps,
      render: stateProps => render({ ...props, ...stateProps })
    })
  /* eslint-enable react/display-name */

  constructor(props) {
    super(props)
  }

  get renderProp() {
    return this.props.render
  }

  render() {
    return this.renderProp(this.renderState())
  }

  async setStateTemporarily(newState, timing) {
    const oldState = this.state
    this.setState(newState)
    await timing()
    this.setState(oldState)
  }
}
