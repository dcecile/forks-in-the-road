import React from "react"

export default class ComparisonState extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      comparison: null
    }
  }

  get server() {
    return this.props.server
  }

  get match() {
    return this.props.match
  }

  get renderProp() {
    return this.props.render
  }

  get isLoading() {
    return this.state.isLoading
  }

  get comparison() {
    return this.state.comparison
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

  handleSetComparisonState(comparisonChanges) {
    this.setState({
      comparison: {
        ...this.comparison,
        ...comparisonChanges
      }
    })
  }

  render() {
    return this.renderProp({
      comparison: this.comparison,
      isLoading: this.isLoading,
      onSetComparisonState: comparisonChanges =>
        this.handleSetComparisonState(comparisonChanges)
    })
  }
}
