import React from "react"

import Button from "Button"

export default function User({ className }) {
  return (
    <span className={`User ${className}`}>
      <span className="User_name">@gh_user</span>
      <Button className="User_signOut">Sign out</Button>
    </span>
  )
}
