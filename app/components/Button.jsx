import React from "react"

import HandlePreventDefault from "HandlePreventDefault"

export default function Button({ className, type, onClick, children }) {
  return (
    <button
      className={`Button ${className}`}
      onClick={HandlePreventDefault(onClick)}
      {...{ type, children }}
    />
  )
}
