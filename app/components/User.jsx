import React from "react"

import Button from "Button"

export default function User({
  className,
  user,
  isUserSigningIn,
  onSignIn,
  onSignOut
}) {
  const renderName = () => {
    if (isUserSigningIn) {
      return "Signing in..."
    } else if (!user) {
      return "Not signed in"
    } else {
      return `@${user.github_login}`
    }
  }

  const renderButton = () => {
    if (isUserSigningIn) {
      return null
    } else if (!user) {
      return (
        <Button className="User_button" onClick={onSignIn}>
          Sign in
        </Button>
      )
    } else {
      return (
        <Button className="User_button" onClick={onSignOut}>
          Sign out
        </Button>
      )
    }
  }

  return (
    <span className={`User ${className}`}>
      <span className="User_name">{renderName()}</span>
      {renderButton()}
    </span>
  )
}
