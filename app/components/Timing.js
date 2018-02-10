function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function timing(milliseconds) {
  return () => sleep(milliseconds)
}

export default {
  appUserSigningInChanging: timing(200),
  appUserSigningOut: timing(400),
  alternativeEditStateChange: 200,
  comparisonAlternativesHighlightLink: timing(2000),
  comparisonCriteriaPopIn: timing(800),
  comparisonEditStateChange: timing(200),
  comparisonRouteChange: 100,
  criterionEditStateChange: timing(150),
  estimateEditStateChange: timing(100)
}
