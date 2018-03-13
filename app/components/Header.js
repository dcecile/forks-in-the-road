import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"

export default class Header extends React.Component {
  static contextTypes = {
    headerSlot: PropTypes.instanceOf(HTMLElement)
  }

  get className() {
    return this.props.className
  }

  get children() {
    return this.props.children
  }

  get headerSlot() {
    return this.context.headerSlot
  }

  render() {
    if (!this.headerSlot) {
      return null
    }

    this.headerSlot.parentElement.className = `Header ${this.className}`

    return this.headerSlot
      ? ReactDOM.createPortal(this.children, this.headerSlot)
      : null
  }
}
