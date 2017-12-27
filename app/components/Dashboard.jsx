import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import NewComparison from "NewComparison"
import HeaderContent from "HeaderContent"

class Dashboard extends React.Component {
  constructor({ match }) {
    super()
    const { url } = match
    this.state = {
      matchUrl: url,
      isLoading: true,
      comparisonStubs: []
    }
    this.load()
  }

  async load() {
    console.log("Getting comparisons")
    const response = await axios.get("/comparisons")
    this.setState({
      ...this.state,
      isLoading: false,
      comparisonStubs: response.data
    })
  }

  async handleSubmitNewComparison(comparison) {
    console.log("Posting new comparison", comparison)
    const response = await axios.post("/comparisons", comparison)
    this.setState({
      ...this.state,
      comparisonStubs: this.state.comparisonStubs.concat(response.data)
    })
    this.props.history.push(`/comparison/${response.data.id}`)
  }

  render() {
    return (
      <div className="Dashboard">
        <HeaderContent>
          <h1 className="App_headerContent__dashboard">
            <Link to={this.state.matchUrl}>Dashboard</Link>
          </h1>
        </HeaderContent>
        {this.state.isLoading ? this.renderLoading() : this.renderLoaded()}
      </div>
    )
  }

  renderLoading() {
    return <span className="Dashboard_item">Loading...</span>
  }

  renderLoaded() {
    return (
      <React.Fragment>
        <NewComparison
          className="Dashboard_item"
          onSubmit={comparison => this.handleSubmitNewComparison(comparison)}
        />
        {this.state.comparisonStubs.map(comparisonStub => (
          <ComparisonStub
            key={comparisonStub.id}
            id={comparisonStub.id}
            name={comparisonStub.name}
          />
        ))}
      </React.Fragment>
    )
  }
}

function ComparisonStub({ id, name }) {
  return (
    <Link className="Dashboard_item" to={`/comparison/${id}`}>
      <h2 className="Dashboard_itemHeader">{name}</h2>
      <h3 className="Dashboard_itemSubHeader">3 alternatives</h3>
    </Link>
  )
}

export default Dashboard
