import React from "react"
import { HashRouter, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"
import Logo from "./Logo"
import Dashboard from "./Dashboard"
import Comparison from "./Comparison"
import RouteNotFound from "./RouteNotFound"

function App() {
  return (
    <HashRouter>
      <div>
        <header className="App_header">
          <h1>
            <Logo />
          </h1>
        </header>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/comparison/:id" component={Comparison} />
          <Route component={RouteNotFound} />
        </Switch>
      </div>
    </HashRouter>
  )
}

export default App
