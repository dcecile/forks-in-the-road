import 'babel-polyfill'
import ReactRailsUJS from "react_ujs"

console.log('Webpacker initialized')

// Support component names relative to this directory:
ReactRailsUJS.useContext(require.context("components", true))
