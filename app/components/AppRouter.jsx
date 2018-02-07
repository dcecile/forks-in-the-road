import React from "react"
import { BrowserRouter } from "react-router-dom"
import { withRouter } from "react-router"

import App from "App"

export default function AppRouter() {
  const AppWithRouter = withRouter(App)
  return (
    <BrowserRouter>
      <AppWithRouter />
    </BrowserRouter>
  )
}
