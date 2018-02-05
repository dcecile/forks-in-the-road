import React from "react"
import queryString from "query-string"

export default class Callback extends React.Component {
  constructor() {
    super()
    this.state = {
      user: "?"
    }
  }

  get server() {
    return this.props.server
  }

  get onUserAuthorized() {
    return this.props.onUserAuthorized
  }

  get history() {
    return this.props.history
  }

  get user() {
    return this.state.user
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
      this.setState({
        user: response.data
      })
      console.log("Authorized", this.user)
      this.onUserAuthorized(this.user)
      this.history.replace("/app/callback")
    }
  }

  render() {
    return (
      <div>
        <div>Authorized: {JSON.stringify(this.user)}</div>
        <div>
          <a href="/users/authorize">Authorize</a>
        </div>
      </div>
    )
  }
}
