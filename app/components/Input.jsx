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
  onChange,
  onFocus,
  onBlur
}) {
  return (
    <input
      placeholder={hasFocus ? null : placeholder}
      value={field.value}
      onChange={event => handleChange(event, field, onChange)}
      {...{
        className,
        type,
        required,
        min,
        max,
        onFocus,
        onBlur
      }}
    />
  )
}

function handleChange(event, field, onChange) {
  field.onChange(event)
  if (onChange) {
    onChange(event)
  }
}
