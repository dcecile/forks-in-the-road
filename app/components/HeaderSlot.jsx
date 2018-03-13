import React from "react"

import Logo from "Logo"
import User from "User"

export default function HeaderSlot({
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
