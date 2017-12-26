import React from "react"
import { Link } from "react-router-dom"

function Logo() {
  return (
    <Link className="Logo" to="/dashboard">
      Forks in the road
    </Link>
  )
}

export default Logo
