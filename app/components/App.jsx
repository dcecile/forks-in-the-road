import React from "react"
import PropTypes from "prop-types"
import { HashRouter, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"
import Dashboard from "Dashboard"
import Comparison from "Comparison"
import RouteNotFound from "RouteNotFound"
import { HeaderSlot } from "Header"

class App extends React.Component {
  static childContextTypes = {
    headerSlot: PropTypes.instanceOf(HTMLElement)
  }

  constructor() {
    super()
    this.state = {
      headerSlot: null
    }
  }

  getChildContext() {
    return this.state
  }

  componentDidMount() {
    this.setState({
      headerSlot: this.headerSlot
    })
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <HeaderSlot onRef={headerSlot => (this.headerSlot = headerSlot)} />
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
