import React from "react"
import MdCached from "react-icons/lib/md/cached"

function Loading() {
  return (
    <div className="Loading">
      <span className="Loading_text">Loading&hellip;</span>
      <MdCached className="Loading_icon" />
    </div>
  )
}

export default Loading
