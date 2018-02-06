import React from "react"

import Button from "Button"

export default function User({ className, user, onSignIn, onSignOut }) {
  const renderName = () => (
    <span className="User_name">
      {user ? `@${user.github_login}` : "Not signed in"}
    </span>
  )

  const renderButton = () =>
    user ? (
      <Button className="User_button" onClick={onSignOut}>
        Sign out
      </Button>
    ) : (
      <Button className="User_button" onClick={onSignIn}>
        Sign in
      </Button>
    )

  return (
    <span className={`User ${className}`}>
      {renderName()}
      {renderButton()}
    </span>
  )
}
