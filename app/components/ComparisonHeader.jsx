import React from "react"
import { Link } from "react-router-dom"

export default function ComparisonHeader({
  matchUrl,
  title,
  parentMatchUrl,
  parentTitle
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
    </h1>
  )
}
