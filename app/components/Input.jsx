import React from "react"

import InputState from "InputState"

export default InputState.renderWith(render)

function render({
  className,
  type,
  required,
  placeholder,
  min,
  max,
  field,
  hasFocus,
  onFocus,
  onBlur
}) {
  const { value, onChange } = field
  return (
    <input
      placeholder={hasFocus ? null : placeholder}
      {...{
        className,
        type,
        required,
        value,
        min,
        max,
        onChange,
        onFocus,
        onBlur
      }}
    />
  )
}
