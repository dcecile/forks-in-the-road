import React from "react"
import { Link } from "react-router-dom"

export default function ComparisonHeader({
  matchUrl,
  title,
  parentMatchUrl,
  parentTitle,
  children
}) {
  return (
    <h1 className="ComparisonHeader">
      {parentMatchUrl && (
        <Link className="ComparisonHeader_part" to={parentMatchUrl}>
          {parentTitle}
        </Link>
      )}
      <Link className="ComparisonHeader_part" to={matchUrl}>
        {title}
      </Link>
      {children}
    </h1>
  )
}
