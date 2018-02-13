export function entries(object) {
  if (Object.entries) {
    return Object.entries(object)
  }

  return Object.keys(object).map(key => [key, object[key]])
}

export function fromEntries(entries) {
  const result = {}
  for (const [key, value] of entries) {
    result[key] = value
  }
  return result
}
