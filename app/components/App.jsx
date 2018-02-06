import PropTypes from "prop-types"
import React from "react"
import queryString from "query-string"
import { BrowserRouter, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"

import Authorization from "Authorization"
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

  get user() {
    return this.state.user
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

  handleUserSignIn() {
    const clientID = process.env.FORKSINTHEROAD_GITHUB_CLIENT_ID
    const params = queryString.stringify({ client_id: clientID })
    const authorizeURL = `https://github.com/login/oauth/authorize?${params}`
    window.location.href = authorizeURL
  }

  handleUserSignOut() {
    this.handleUserChange(null)
  }

  handleUserAuthorized(user) {
    this.handleUserChange(user)
  }

  handleUserChange(user) {
    this.writeUserToLocalStorage(user)
    this.server.user = user
    this.setState({ user })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <HeaderSlot
            user={this.user}
            onRef={headerSlot => (this.headerSlot = headerSlot)}
            onUserSignIn={() => this.handleUserSignIn()}
            onUserSignOut={() => this.handleUserSignOut()}
          />
          <Switch>
            <Redirect exact from="/" to="/app/dashboard" />
            <Route
              exact
              path="/app/callback"
              render={routeProps => this.renderAuthorization(routeProps)}
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
      </BrowserRouter>
    )
  }

  renderAuthorization(routeProps) {
    return (
      <Authorization
        className="App_main"
        user={this.user}
        onUserSignIn={() => this.handleUserSignIn()}
        onUserAuthorized={user => this.handleUserAuthorized(user)}
        server={this.server}
        {...routeProps}
      />
    )
  }

  renderDashboard(routeProps) {
    return this.renderSignInRequired(
      routeProps,
      <Dashboard className="App_main" server={this.server} {...routeProps} />
    )
  }

  renderComparison(routeProps) {
    return this.renderSignInRequired(
      routeProps,
      <Comparison className="App_main" server={this.server} {...routeProps} />
    )
  }

  renderSignInRequired(routeProps, component) {
    if (!this.user) {
      return this.renderAuthorization(routeProps)
    } else {
      return component
    }
  }
}
