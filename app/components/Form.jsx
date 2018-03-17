import React from "react"

import HandlePreventDefault from "HandlePreventDefault"

export default function Form({ className, onRef, onSubmit, children }) {
  return (
    <form
      ref={onRef}
      onSubmit={HandlePreventDefault(onSubmit)}
      {...{ className, children }}
    />
  )
}
