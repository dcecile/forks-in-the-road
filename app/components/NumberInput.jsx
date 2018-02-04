import React from "react"

import Input from "Input"

export default function NumberInput({ className, ...props }) {
  return (
    <Input type="number" className={`NumberInput ${className}`} {...props} />
  )
}
