import React from "react"
import { HashRouter, Link, Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"
import axios from "axios"

function App() {
  return (
    <HashRouter>
      <div>
        <h1>Forks in the Road</h1>
        <Switch>
          <Redirect exact from="/" to="/dashboard"/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route exact path="/comparison/:id" component={Comparison}/>
          <Route component={RouteNotFound}/>
        </Switch>
      </div>
    </HashRouter>
  )
}

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      comparisonHeaders: []
    }
    this.loadComparisons()
  }

  async loadComparisons() {
    const response = await axios.get("/comparisons");
    this.setState({
      isLoading: false,
      comparisonHeaders: response.data
    })
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
        <h2>Comparisons</h2>
        <ul>
          {this.state.comparisonHeaders.map(comparisonHeader =>
            <li key={comparisonHeader.id}>
              <ComparisonHeader
                id={comparisonHeader.id}
                name={comparisonHeader.name}
              />
            </li>)}
        </ul>
      </div>
    )
  }
}

function ComparisonHeader({ id, name }) {
  return (
    <Link to={'/comparison/' + id}>{name}</Link>
  )
}

function Comparison({ match }) {
  const { id } = match.params
  return (
    <h2>Comparison ({id})</h2>
  )
}

function RouteNotFound({}) {
  return (
    <div>
      <h2>Page not found</h2>
      <Link to="/">Go home</Link>
    </div>
  )
}

export default App
