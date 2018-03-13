import PropTypes from "prop-types"
import queryString from "query-string"

import Server from "Server"
import StateComponent from "StateComponent"
import Timing from "Timing"

const UserStorageKey = "user"

export default class AppState extends StateComponent {
  static renderWith = StateComponent.renderWithComponent(AppState)

  static childContextTypes = {
    headerSlot: PropTypes.instanceOf(HTMLElement)
  }

  constructor(props) {
    super(props)
    const user = this.readUserFromLocalStorage()
    this.state = {
      headerSlot: null,
      user,
      isUserSigningInChanging: false,
      isUserSigningIn: false,
      isUserSigningOut: false
    }
    this.server = new Server(user)
    this.headerSlot = null
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

  renderState() {
    return {
      headerSlot: this.headerSlot,
      user: this.user,
      server: this.server,
      isUserSigningInChanging: this.isUserSigningInChanging,
      isUserSigningIn: this.isUserSigningIn,
      isUserSigningOut: this.isUserSigningOut,
      onHeaderSlotRef: headerSlot => (this.headerSlot = headerSlot),
      onUserSignIn: user => this.handleUserSignIn(user),
      onUserSignOut: () => this.handleUserSignOut()
    }
  }
}
