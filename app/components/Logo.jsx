import React from "react"
import { Link } from "react-router-dom"

export default function Logo({ className }) {
  return (
    <Link className={`Logo ${className}`} to="/">
      Forks in the road
    </Link>
  )
}
