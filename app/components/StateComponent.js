import React from "react"

export default class StateComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  get renderProp() {
    return this.props.render
  }

  render() {
    return this.renderProp(this.renderState())
  }
}

/* eslint-disable react/display-name */
StateComponent.renderWithComponent = State => (render, fixedProps) => props =>
  React.createElement(State, {
    ...props,
    ...fixedProps,
    render: stateProps => render({ ...props, ...stateProps })
  })
/* eslint-enable react/display-name */
