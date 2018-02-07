import React from "react"

import Button from "Button"
import Header from "Header"

export default function SignIn({ className, isUserSigningIn, onUserSignIn }) {
  const isSigningInClassName = isUserSigningIn ? "Header__isSigningIn" : ""

  const renderSigningIn = () => {
    return <span>Signing in...</span>
  }

  const renderSignInRequired = () => {
    return <Button onClick={onUserSignIn}>Sign in</Button>
  }

  return (
    <main className={`Dashboard ${className}`}>
      <Header className={`Header__comparisonMode ${isSigningInClassName}`} />
      {isUserSigningIn ? renderSigningIn() : renderSignInRequired()}
    </main>
  )
}
