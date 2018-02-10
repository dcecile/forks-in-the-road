import PropTypes from "prop-types"
import React from "react"
import ReactDOM from "react-dom"

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

export function HeaderSlot({
  user,
  isUserSigningInChanging,
  isUserSigningIn,
  onRef,
  onUserSignIn,
  onUserSignOut
}) {
  return (
    <header>
      <span className="Header_logoArea">
        <Logo className="Header_logo" />
      </span>
      <span ref={onRef} className="Header_title" />
      <User
        className="Header_user"
        user={user}
        isUserSigningInChanging={isUserSigningInChanging}
        isUserSigningIn={isUserSigningIn}
        onSignIn={onUserSignIn}
        onSignOut={onUserSignOut}
      />
    </header>
  )
}
