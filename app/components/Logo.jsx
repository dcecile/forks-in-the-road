import React from "react"
import { Link } from "react-router-dom"

function Logo({ className }) {
  return (
    <Link className={`Logo ${className}`} to="/">
      Forks in the road
    </Link>
  )
}

export default Logo
