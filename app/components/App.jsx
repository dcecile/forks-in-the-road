import React from "react"
import PropTypes from "prop-types"
import { HashRouter, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"
import Logo from "Logo"
import Dashboard from "Dashboard"
import Comparison from "Comparison"
import RouteNotFound from "RouteNotFound"
import User from "User"

class App extends React.Component {
  static childContextTypes = {
    headerContent: PropTypes.func
  }

  constructor() {
    super()
    this.state = {
      headerContent: null
    }
    this.childContext = {
      headerContent: headerContent => this.setState({ headerContent })
    }
  }

  getChildContext() {
    return this.childContext
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App_header">
            <Logo />
            {this.state.headerContent}
            <User />
          </header>
          <main className="App_main">
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/comparison/:id" component={Comparison} />
              <Route component={RouteNotFound} />
            </Switch>
          </main>
        </div>
      </HashRouter>
    )
  }
}

export default App
