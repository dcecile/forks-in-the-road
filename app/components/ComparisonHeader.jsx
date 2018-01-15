import React from "react"
import { Link } from "react-router-dom"

export default function ComparisonHeader({ matchUrl, title }) {
  return (
    <h1>
      <Link to={matchUrl}>{title}</Link>
    </h1>
  )
}
