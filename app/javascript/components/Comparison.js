import React from "react"

function Comparison({ match }) {
  const { id } = match.params
  return (
    <h2>Comparison ({id})</h2>
  )
}

export default Comparison
