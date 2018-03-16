function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function timing(milliseconds) {
  return () => sleep(milliseconds)
}

export default {
  alternativeEditStateChange: 200,
  appUserSigningInChanging: timing(200),
  appUserSigningOut: timing(400),
  comparisonInfoEditStateChange: timing(200),
  comparisonRouteChange: 100,
  criterionEditStateChange: timing(150),
  criterionIndexPopIn: timing(800),
  estimateEditStateChange: timing(100)
}
