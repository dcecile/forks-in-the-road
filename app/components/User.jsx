import React from "react"

import Button from "Button"

export default function User({
  className,
  user,
  isUserSigningInChanging,
  isUserSigningIn,
  onSignIn,
  onSignOut
}) {
  const isUserSigningInChangingClassName = isUserSigningInChanging
    ? "User__isSigningInChanging"
    : ""

  return (
    <span className={`User ${isUserSigningInChangingClassName} ${className}`}>
      {renderAvatar(user)}
      <span className="User_name">{renderName(user, isUserSigningIn)}</span>
      {renderButton(user, isUserSigningIn, onSignIn, onSignOut)}
    </span>
  )
}

function renderAvatar(user) {
  return (
    user && (
      <img
        className="User_avatar"
        width="32"
        height="32"
        src={`${user.github_avatar_url}&s=32`}
      />
    )
  )
}

function renderName(user, isUserSigningIn) {
  if (isUserSigningIn) {
    return "Signing in..."
  } else if (!user) {
    return "Not signed in"
  } else {
    return `@${user.github_login}`
  }
}

function renderButton(user, isUserSigningIn, onSignIn, onSignOut) {
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
