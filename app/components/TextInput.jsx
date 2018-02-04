import React from "react"

import Input from "Input"

export default function TextInput({ className, ...props }) {
  return <Input type="text" className={`TextInput ${className}`} {...props} />
}
