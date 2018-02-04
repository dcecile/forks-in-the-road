import PropTypes from "prop-types"
import React from "react"
import { BrowserRouter, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"

import Comparison from "Comparison"
import Dashboard from "Dashboard"
import RouteNotFound from "RouteNotFound"
import { HeaderSlot } from "Header"

export default class App extends React.Component {
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
      <BrowserRouter>
        <div className="App">
          <HeaderSlot onRef={headerSlot => (this.headerSlot = headerSlot)} />
          <div className="App_main">
            <Switch>
              <Redirect exact from="/" to="/app/dashboard" />
              <Route exact path="/app/dashboard" component={Dashboard} />
              <Route path="/app/comparison/:id" component={Comparison} />
              <Route component={RouteNotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
