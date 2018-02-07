import PropTypes from "prop-types"
import React from "react"
import queryString from "query-string"
import { Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"

import SignIn from "SignIn"
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
      user,
      isUserSigningIn: false
    }
    this.server = new Server(user)
  }

  get history() {
    return this.props.history
  }

  get user() {
    return this.state.user
  }

  get isUserSigningIn() {
    return this.state.isUserSigningIn
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
    this.handleUserSignInCallback()
  }

  handleUserSignIn() {
    this.setState({ isUserSigningIn: true })
    const clientID = process.env.FORKSINTHEROAD_GITHUB_CLIENT_ID
    const params = queryString.stringify({
      client_id: clientID,
      redirect_uri: window.location.href
    })
    const authorizeURL = `https://github.com/login/oauth/authorize?${params}`
    window.location.href = authorizeURL
  }

  async handleUserSignInCallback() {
    const code = this.parseSearchParameter()
    if (!code) {
      return
    }

    this.setState({ isUserSigningIn: true })
    console.log("Authorizing", code)
    const response = await this.server.post("/users/authorize", { code })
    const user = response.data
    console.log("Authorized", user)
    this.handleUserChange(user)
    this.removeSearchParameter()
    this.setState({ isUserSigningIn: false })
  }

  parseSearchParameter() {
    const parameters = queryString.parse(window.location.search)
    return parameters["code"]
  }

  removeSearchParameter() {
    this.history.replace(window.location.pathname)
  }

  handleUserChange(user) {
    this.writeUserToLocalStorage(user)
    this.server.user = user
    this.setState({ user })
  }

  handleUserSignOut() {
    this.handleUserChange(null)
  }

  render() {
    return (
      <div className="App">
        <HeaderSlot
          user={this.user}
          isUserSigningIn={this.isUserSigningIn}
          onRef={headerSlot => (this.headerSlot = headerSlot)}
          onUserSignIn={() => this.handleUserSignIn()}
          onUserSignOut={() => this.handleUserSignOut()}
        />
        <Switch>
          <Redirect exact from="/" to="/app/dashboard" />
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
    )
  }

  renderDashboard(routeProps) {
    return this.renderSignInRequired(
      <Dashboard className="App_main" server={this.server} {...routeProps} />
    )
  }

  renderComparison(routeProps) {
    return this.renderSignInRequired(
      <Comparison className="App_main" server={this.server} {...routeProps} />
    )
  }

  renderSignInRequired(component) {
    if (this.isUserSigningIn || !this.user) {
      return this.renderSignIn()
    } else {
      return component
    }
  }

  renderSignIn() {
    return (
      <SignIn
        className="App_main"
        isUserSigningIn={this.isUserSigningIn}
        onUserSignIn={() => this.handleUserSignIn()}
      />
    )
  }
}
