import React from "react"
import { HashRouter, Link, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"
import Dashboard from "./Dashboard"
import Comparison from "./Comparison"
import RouteNotFound from "./RouteNotFound"

function App() {
  return (
    <HashRouter>
      <div>
        <h1><Link to="/">Forks in the Road</Link></h1>
        <Switch>
          <Redirect exact from="/" to="/dashboard"/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/comparison/:id" component={Comparison}/>
          <Route component={RouteNotFound}/>
        </Switch>
      </div>
    </HashRouter>
  )
}

export default App
