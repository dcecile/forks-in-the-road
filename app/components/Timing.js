function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function timing(milliseconds) {
  return () => sleep(milliseconds)
}

export default {
  comparisonAlternativesHighlightLink: timing(2000),
  comparisonEditStateChange: timing(200),
  comparisonRouteChange: 200,
  criterionEditStateChange: timing(150)
}
