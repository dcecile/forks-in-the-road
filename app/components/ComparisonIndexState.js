import StateComponent from "StateComponent"

export default class ComparisonIndexState extends StateComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      comparisonStubs: []
    }
  }

  get server() {
    return this.props.server
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

  renderState() {
    return {
      isLoading: this.isLoading,
      comparisonStubs: this.comparisonStubs,
      onSubmitNewComparison: comparison =>
        this.handleSubmitNewComparison(comparison)
    }
  }
}

ComparisonIndexState.renderWith = StateComponent.renderWithComponent(
  ComparisonIndexState
)
