import ReactRailsUJS from "react_ujs"
import "styles/Style.sass"

console.log("Webpacker initialized")

// Support component names relative to this directory:
ReactRailsUJS.useContext(require.context("../components", true))
