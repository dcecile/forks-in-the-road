import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"

export default class Header extends React.Component {
  static contextTypes = {
    headerSlotElement: PropTypes.instanceOf(HTMLElement)
  }

  get className() {
    return this.props.className
  }

  get children() {
    return this.props.children
  }

  get headerSlotElement() {
    return this.context.headerSlotElement
  }

  render() {
    if (!this.headerSlotElement) {
      return null
    }

    this.headerSlotElement.parentElement.className = `Header ${this.className}`

    return this.headerSlotElement
      ? ReactDOM.createPortal(this.children, this.headerSlotElement)
      : null
  }
}
