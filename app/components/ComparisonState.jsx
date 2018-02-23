import React from "react"

import ComparisonRender from "ComparisonRender"

export default class ComparisonState extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      comparison: null
    }
  }

  get className() {
    return this.props.className
  }

  get server() {
    return this.props.server
  }

  get match() {
    return this.props.match
  }

  get location() {
    return this.props.location
  }

  get isLoading() {
    return this.state.isLoading
  }

  get comparison() {
    return this.state.comparison
  }

  get matchUrl() {
    return this.match.url
  }

  setComparisonState(comparisonChanges) {
    this.setState({
      comparison: {
        ...this.comparison,
        ...comparisonChanges
      }
    })
  }

  componentDidMount() {
    const { params: { id } } = this.match
    this.load(id)
  }

  async load(id) {
    console.log("Getting comparison")
    const response = await this.server.get(`/comparisons/${id}`)
    this.setState({
      isLoading: false,
      comparison: response.data
    })
  }

  render() {
    return (
      <ComparisonRender
        className={this.className}
        comparison={this.comparison}
        isLoading={this.isLoading}
        location={this.location}
        matchUrl={this.matchUrl}
        server={this.server}
        onSetComparisonState={comparisonChanges =>
          this.setComparisonState(comparisonChanges)
        }
      />
    )
  }
}
