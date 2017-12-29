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
    headerContent: PropTypes.instanceOf(HTMLElement)
  }

  constructor() {
    super()
    this.state = {
      headerContent: null
    }
  }

  getChildContext() {
    return this.state
  }

  componentDidMount() {
    this.setState({
      headerContent: this.headerContent
    })
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App_header">
            <Logo />
            <div ref={headerContent => (this.headerContent = headerContent)} />
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
