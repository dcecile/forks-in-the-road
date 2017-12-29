import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import Logo from "Logo"
import User from "User"

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

export function HeaderSlot({ onRef }) {
  return (
    <header>
      <Logo className="Header_logo" />
      <div ref={onRef} />
      <User className="Header_user" />
    </header>
  )
}
