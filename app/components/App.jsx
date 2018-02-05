import PropTypes from "prop-types"
import React from "react"
import { BrowserRouter, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"

import Callback from "Callback"
import Comparison from "Comparison"
import Dashboard from "Dashboard"
import RouteNotFound from "RouteNotFound"
import Server from "Server"
import { HeaderSlot } from "Header"

export default class App extends React.Component {
  static childContextTypes = {
    headerSlot: PropTypes.instanceOf(HTMLElement)
  }

  constructor() {
    super()
    const user = this.readUserFromLocalStorage()
    this.state = {
      headerSlot: null,
      user
    }
    this.server = new Server(user)
  }

  getChildContext() {
    return { headerSlot: this.state.headerSlot }
  }

  readUserFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem("user") || null)
  }

  writeUserToLocalStorage(user) {
    window.localStorage.setItem("user", JSON.stringify(user))
  }

  componentDidMount() {
    this.setState({
      headerSlot: this.headerSlot
    })
  }

  handleUserAuthorized(user) {
    this.writeUserToLocalStorage(user)
    this.server.user = user
    this.setState({ user })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderSlot onRef={headerSlot => (this.headerSlot = headerSlot)} />
          <div className="App_main">
            <Switch>
              <Redirect exact from="/" to="/app/dashboard" />
              <Route
                exact
                path="/app/callback"
                render={routeProps => this.renderCallback(routeProps)}
              />
              <Route
                exact
                path="/app/dashboard"
                render={routeProps => this.renderDashboard(routeProps)}
              />
              <Route
                path="/app/comparison/:id"
                render={routeProps => this.renderComparison(routeProps)}
              />
              <Route component={RouteNotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }

  renderCallback(routeProps) {
    return (
      <Callback
        server={this.server}
        onUserAuthorized={user => this.handleUserAuthorized(user)}
        {...routeProps}
      />
    )
  }

  renderDashboard(routeProps) {
    return <Dashboard server={this.server} {...routeProps} />
  }

  renderComparison(routeProps) {
    return <Comparison server={this.server} {...routeProps} />
  }
}
