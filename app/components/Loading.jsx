import MdCached from "react-icons/lib/md/cached"
import React from "react"

export default function Loading() {
  return (
    <div className="Loading">
      <span className="Loading_text">Loading&hellip;</span>
      <MdCached className="Loading_icon" />
    </div>
  )
}
