import PropTypes from "prop-types"
import React from "react"
import queryString from "query-string"
import { Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"

import ComparisonIndex from "ComparisonIndex"
import Comparison from "Comparison"
import RouteNotFound from "RouteNotFound"
import Server from "Server"
import SignIn from "SignIn"
import Timing from "Timing"
import { HeaderSlot } from "Header"

const UserStorageKey = "user"

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
      isUserSigningInChanging: false,
      isUserSigningIn: false,
      isUserSigningOut: false
    }
    this.server = new Server(user)
  }

  get history() {
    return this.props.history
  }

  get user() {
    return this.state.user
  }

  get isUserSigningInChanging() {
    return this.state.isUserSigningInChanging
  }

  get isUserSigningIn() {
    return this.state.isUserSigningIn
  }

  get isUserSigningOut() {
    return this.state.isUserSigningOut
  }

  get isUserSigningOutClassName() {
    return this.isUserSigningOut ? "App_main__isUserSigningOut" : ""
  }

  getChildContext() {
    return { headerSlot: this.state.headerSlot }
  }

  readUserFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem(UserStorageKey) || null)
  }

  writeUserToLocalStorage(user) {
    window.localStorage.setItem(UserStorageKey, JSON.stringify(user))
  }

  componentDidMount() {
    this.setState({
      headerSlot: this.headerSlot
    })
    this.handleUserSignInCallback()
    this.handleOtherTabUserChange()
  }

  async handleUserSignIn() {
    this.setState({ isUserSigningInChanging: true })
    await Timing.appUserSigningInChanging()
    this.setState({ isUserSigningInChanging: false, isUserSigningIn: true })
    const clientID = process.env.GITHUB_CLIENT_ID
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
    this.setState({ isUserSigningInChanging: true })
    await Timing.appUserSigningInChanging()
    this.setState({ isUserSigningInChanging: false })
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

  async handleUserSignOut() {
    this.setState({ isUserSigningOut: true })
    await Timing.appUserSigningOut()
    this.handleUserChange(null)
    this.setState({ isUserSigningOut: false })
  }

  handleOtherTabUserChange() {
    window.addEventListener("storage", event => {
      if (event.key === UserStorageKey) {
        const user = JSON.parse(event.newValue)
        console.log("Other tab user change", user)
        this.server.user = user
        this.setState({ user })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <HeaderSlot
          user={this.user}
          isUserSigningInChanging={this.isUserSigningInChanging}
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
            render={routeProps => this.renderComparisonIndex(routeProps)}
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

  renderComparisonIndex(routeProps) {
    return this.renderSignInRequired(
      <ComparisonIndex
        className={`App_main ${this.isUserSigningOutClassName}`}
        server={this.server}
        {...routeProps}
      />
    )
  }

  renderComparison(routeProps) {
    return this.renderSignInRequired(
      <Comparison
        className={`App_main ${this.isUserSigningOutClassName}`}
        server={this.server}
        {...routeProps}
      />
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
        isUserSigningInChanging={this.isUserSigningInChanging}
        isUserSigningIn={this.isUserSigningIn}
        onUserSignIn={() => this.handleUserSignIn()}
      />
    )
  }
}
