import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import axios from "axios"
import RouteNotFound from "./RouteNotFound"
import Alternative from "./Alternative"

class Comparison extends React.Component {
  constructor({ match }) {
    super()
    const { params: { id }, url } = match
    this.state = {
      matchUrl: url,
      isLoading: true,
      comparison: null
    }
    this.load(id)
  }

  async load(id) {
    const response = await axios.get(`/comparisons/${id}`);
    this.setState({
      ...this.state,
      isLoading: false,
      comparison: response.data
    })
  }

  get comparison() {
    return this.state.comparison
  }

  render() {
    return (this.state.isLoading ?
      this.renderLoading() :
      this.renderLoaded())
  }

  renderLoading() {
    return (
      <h2>Loading...</h2>
    )
  }

  renderLoaded() {
    return (
      <div>
        {this.renderHeader()}
          <Switch>
            <Route
              exact
              path={this.state.matchUrl}
              render={() => this.renderSummary()}
            />
            <Route
              exact
              path={`${this.state.matchUrl}/alternative/:id`}
              render={routeProps => this.renderAlternative(routeProps)}
            />
            <Route component={RouteNotFound}/>
          </Switch>
      </div>
    )
  }

  renderAlternative(routeProps) {
    return (
      <Alternative
        {...routeProps}
        alternatives={this.comparison.alternatives}
        criteria={this.comparison.criteria}
      />
    )
  }

  renderHeader() {
    return (
      <h2>
        <Link to={this.state.matchUrl}>{this.comparison.name}</Link>
      </h2>
    )
  }

  renderSummary() {
    return (
      <div>
        {this.renderAlternatives()}
        {this.renderConfig()}
      </div>
    )
  }

  renderAlternatives() {
    return (
      <div>
        <h3>Alternatives</h3>
        <ul>
          {this.comparison.alternatives.map(
            alternative => this.renderAlternativeLink(alternative))}
        </ul>
      </div>
    )
  }

  renderAlternativeLink(alternative) {
    return (
      <li key={alternative.id}>
        <Link to={`${this.state.matchUrl}/alternative/${alternative.id}`}>
          {alternative.name}
        </Link>
      </li>
    )
  }

  renderConfig() {
    return (
      <h3>
        <Link to={`${this.state.matchUrl}/config`}>Config</Link>
      </h3>
    )
  }
}

export default Comparison
