import React from "react"
import { Link } from "react-router-dom"

export default function RouteNotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <Link to="/">Go home</Link>
    </div>
  )
}
