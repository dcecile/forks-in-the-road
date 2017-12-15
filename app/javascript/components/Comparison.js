import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

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
        {this.renderAlternatives()}
        {this.renderConfig()}
      </div>
    )
  }

  renderHeader() {
    return (
      <h2>
        <Link to={this.state.matchUrl}>{this.comparison.name}</Link>
      </h2>
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
