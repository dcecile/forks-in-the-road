import React from "react"
import Button from "Button"

function User() {
  return (
    <span className="User">
      <span className="User_name">@gh_user</span>
      <Button className="User_signOut">Sign out</Button>
    </span>
  )
}

export default User
