import React from "react"

import HandlePreventDefault from "HandlePreventDefault"

export default function Form({ className, onSubmit, children }) {
  return (
    <form
      onSubmit={HandlePreventDefault(onSubmit)}
      {...{ className, children }}
    />
  )
}
