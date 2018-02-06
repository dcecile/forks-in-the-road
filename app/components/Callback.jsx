import React from "react"
import queryString from "query-string"

import Button from "Button"

export default class Callback extends React.Component {
  constructor() {
    super()
  }

  get user() {
    return this.props.user
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

  componentDidMount() {
    this.authorize()
  }

  async authorize() {
    const parameters = queryString.parse(window.location.search)
    const code = parameters["code"]
    if (code) {
      console.log("Authorizing", code)
      const response = await this.server.post("/users/authorize_callback", {
        code
      })
      const user = response.data
      console.log("Authorized", user)
      this.onUserAuthorized(user)
      this.history.replace("/app/callback")
    }
  }

  render() {
    return (
      <div>
        <div>Authorized: {JSON.stringify(this.user)}</div>
        <div>
          <Button onClick={this.onUserSignIn}>Sign in</Button>
        </div>
      </div>
    )
  }
}
