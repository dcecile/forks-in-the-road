import MdAutorenew from "react-icons/lib/md/autorenew"
import React from "react"

import Button from "Button"
import Header from "Header"

export default function SignIn({
  className,
  isUserSigningInChanging,
  isUserSigningIn,
  onUserSignIn
}) {
  const stateClassName = isUserSigningInChanging
    ? "SignIn_card__isSigningInChanging"
    : isUserSigningIn
      ? "SignIn_card__isSigningIn"
      : "SignIn_card__isSignInRequired"

  const renderSigningIn = () => {
    return (
      <React.Fragment>
        <h1 className="SignIn_header">Please wait</h1>
        <div className="SignIn_progress">
          <span className="SignIn_progressText">Signing in&hellip;</span>
          <MdAutorenew className="SignIn_progressIcon" />
        </div>
      </React.Fragment>
    )
  }

  const renderSignInRequired = () => {
    return (
      <React.Fragment>
        <h1 className="SignIn_header">Sign in required</h1>
        <p className="SignIn_text">
          To continue from where you left off, please sign in:
        </p>
        <Button className="SignIn_button" onClick={onUserSignIn}>
          Sign in now
        </Button>
      </React.Fragment>
    )
  }

  return (
    <main className={`SignIn ${className}`}>
      <Header className="Header__comparisonMode" />
      <div className={`SignIn_card ${stateClassName}`}>
        <div className="SignIn_body">
          {isUserSigningIn ? renderSigningIn() : renderSignInRequired()}
        </div>
      </div>
    </main>
  )
}
