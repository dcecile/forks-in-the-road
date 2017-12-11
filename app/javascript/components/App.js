import React from "react"
import axios from "axios"

class App extends React.Component {
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
    return (
      <div>
        <h1>Forks in the Road</h1>
        {this.state.isLoading ?
          this.renderLoading() :
          this.renderLoaded()}
      </div>
    )
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
            <ComparisonHeader
              key={comparisonHeader.id}
              name={comparisonHeader.name}
            />)}
        </ul>
      </div>
    )
  }
}

function ComparisonHeader({ name }) {
  return (
    <li>{name}</li>
  )
}

export default App
