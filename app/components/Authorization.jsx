import React from "react"
import queryString from "query-string"

import Button from "Button"
import Header from "Header"

export default class Authorization extends React.Component {
  constructor() {
    super()
    this.state = {
      isAuthorizing: false
    }
  }

  get className() {
    return this.props.className
  }

  get onUserSignIn() {
    return this.props.onUserSignIn
  }

  get onUserAuthorized() {
    return this.props.onUserAuthorized
  }

  get server() {
    return this.props.server
  }

  get history() {
    return this.props.history
  }

  get isAuthorizing() {
    return this.state.isAuthorizing
  }

  get isAuthorizingClassName() {
    return this.isAuthorizing ? "Header__isAuthorizing" : ""
  }

  componentDidMount() {
    this.authorize()
  }

  async authorize() {
    const code = this.parseSearchParameter()
    if (!code) {
      return
    }

    this.removeSearchParameter()
    this.setState({ isAuthorizing: true })
    console.log("Authorizing", code)
    const response = await this.server.post("/users/authorize_callback", {
      code
    })
    const user = response.data
    console.log("Authorized", user)
    this.onUserAuthorized(user)
    this.history.replace("/")
  }

  parseSearchParameter() {
    const parameters = queryString.parse(window.location.search)
    return parameters["code"]
  }

  removeSearchParameter() {
    this.history.replace(window.location.pathname)
  }

  render() {
    return (
      <main className={`Dashboard ${this.className}`}>
        <Header
          className={`Header__comparisonMode ${this.isAuthorizingClassName}`}
        />
        {this.isAuthorizing
          ? this.renderAuthorizing()
          : this.renderSignInRequired()}
      </main>
    )
  }

  renderAuthorizing() {
    return <span>Signing in...</span>
  }

  renderSignInRequired() {
    return <Button onClick={this.onUserSignIn}>Sign in</Button>
  }
}
