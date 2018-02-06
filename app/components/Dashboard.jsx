import React from "react"
import { Link } from "react-router-dom"

import Header from "Header"
import Loading from "Loading"
import NewComparison from "NewComparison"

export default class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      comparisonStubs: []
    }
  }

  get className() {
    return this.props.className
  }

  get server() {
    return this.props.server
  }

  get matchUrl() {
    return this.props.match.url
  }

  get history() {
    return this.props.history
  }

  get isLoading() {
    return this.state.isLoading
  }

  get comparisonStubs() {
    return this.state.comparisonStubs
  }

  componentDidMount() {
    this.load()
  }

  async load() {
    console.log("Getting comparisons")
    const response = await this.server.get("/comparisons")
    this.setState({
      isLoading: false,
      comparisonStubs: response.data
    })
  }

  async handleSubmitNewComparison(comparison) {
    console.log("Posting new comparison", comparison)
    const response = await this.server.post("/comparisons", comparison)
    this.setState({
      comparisonStubs: this.comparisonStubs.concat(response.data)
    })
    this.history.push(`/app/comparison/${response.data.id}`)
  }

  render() {
    return (
      <main className={`Dashboard ${this.className}`}>
        <Header className="Header__dashboardMode">
          <h1 className="Header_titleContent">
            <Link to={this.matchUrl}>Dashboard</Link>
          </h1>
        </Header>
        {this.isLoading ? this.renderLoading() : this.renderLoaded()}
      </main>
    )
  }

  renderLoading() {
    return <Loading />
  }

  renderLoaded() {
    return (
      <React.Fragment>
        <NewComparison
          className="Dashboard_item"
          onSubmit={comparison => this.handleSubmitNewComparison(comparison)}
        />
        {this.comparisonStubs.map(comparisonStub =>
          this.renderComparisonStub(
            comparisonStub.id,
            comparisonStub.name,
            comparisonStub.alternatives_size
          )
        )}
      </React.Fragment>
    )
  }

  renderComparisonStub(id, name, size) {
    return (
      <Link key={id} className="Dashboard_item" to={`/app/comparison/${id}`}>
        <h2 className="Dashboard_itemHeader">{name}</h2>
        <h3 className="Dashboard_itemSubHeader">{size} alternatives</h3>
      </Link>
    )
  }
}
