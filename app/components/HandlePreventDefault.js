export default function HandlePreventDefault(onEvent) {
  return event => {
    if (onEvent) {
      event.preventDefault()
      onEvent(event)
    }
  }
}
