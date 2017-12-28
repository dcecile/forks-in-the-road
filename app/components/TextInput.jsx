import React from "react"
import Input from "Input"

function TextInput({ className, ...props }) {
  return <Input type="text" className={`TextInput ${className}`} {...props} />
}

export default TextInput
