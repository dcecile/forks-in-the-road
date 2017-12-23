import React from "react"

function Estimate({ estimate, criterion }) {
  return (
    <div>
      {criterion.name}: {estimate.estimate}
    </div>
  )
}

export default Estimate
