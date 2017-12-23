import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import axios from "axios"
import RouteNotFound from "./RouteNotFound"
import Alternative from "./Alternative"
import EditComparison from "./EditComparison"
import ComparisonAlternatives from "./ComparisonAlternatives"
import ComparisonCriteria from "./ComparisonCriteria"

class Comparison extends React.Component {
  constructor({ match }) {
    super()
    const { params: { id }, url } = match
    this.state = {
      matchUrl: url,
      isLoading: true,
      isEditing: false,
      comparison: null
    }
    this.load(id)
  }

  async load(id) {
    console.log("Getting comparison")
    const response = await axios.get(`/comparisons/${id}`)
    this.setState({
      ...this.state,
      isLoading: false,
      comparison: response.data
    })
  }

  async handleSubmitNewAlternative(alternative) {
    console.log("Posting new alternative", alternative)
    const response = await axios.post(
      `/comparisons/${this.comparison.id}/alternatives`,
      alternative
    )
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        alternatives: this.comparison.alternatives.concat(response.data)
      }
    })
  }

  async handleSubmitNewCriterion(criterion) {
    console.log("Posting new criterion", criterion)
    const response = await axios.post(
      `/comparisons/${this.comparison.id}/criteria`,
      criterion
    )
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        criteria: this.comparison.criteria.concat(response.data)
      }
    })
  }

  async handleSubmitEditCriterion(criterion) {
    console.log("Patching criterion", criterion)
    const response = await axios.patch(`/criteria/${criterion.id}`, criterion)
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        criteria: this.comparison.criteria.map(
          item => (item.id === criterion.id ? response.data : item)
        )
      }
    })
  }

  handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditing: true
    })
  }

  async handleSubmitEdit(comparison) {
    console.log("Patching comparison", comparison)
    const response = await axios.patch(
      `/comparisons/${this.comparison.id}`,
      comparison
    )
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        ...response.data
      }
    })
    this.handleCancelEdit()
  }

  handleCancelEdit() {
    this.setState({
      ...this.state,
      isEditing: false
    })
  }

  get comparison() {
    return this.state.comparison
  }

  render() {
    return this.state.isLoading ? this.renderLoading() : this.renderLoaded()
  }

  renderLoading() {
    return <h2>Loading...</h2>
  }

  renderLoaded() {
    return (
      <div>
        {this.renderHeader()}
        <Switch>
          <Route
            exact
            path={this.state.matchUrl}
            render={() => this.renderAlternatives()}
          />
          <Route
            exact
            path={`${this.state.matchUrl}/criteria`}
            render={() => this.renderCriteria()}
          />
          <Route
            exact
            path={`${this.state.matchUrl}/alternative/:id`}
            render={routeProps => this.renderOneAlternative(routeProps)}
          />
          <Route component={RouteNotFound} />
        </Switch>
      </div>
    )
  }

  renderHeader() {
    if (!this.state.isEditing) {
      return (
        <h2>
          <Link to={this.state.matchUrl}>{this.comparison.name}</Link>{" "}
          <button onClick={() => this.handleBeginEdit()}>Edit</button>
        </h2>
      )
    } else {
      return this.renderEdit()
    }
  }

  renderEdit() {
    return (
      <div>
        <h2>Editing comparison</h2>
        <EditComparison
          comparison={this.comparison}
          onSubmit={comparison => this.handleSubmitEdit(comparison)}
          onCancel={() => this.handleCancelEdit()}
        />
      </div>
    )
  }

  renderAlternatives() {
    return (
      <ComparisonAlternatives
        matchUrl={this.state.matchUrl}
        alternatives={this.comparison.alternatives}
        onSubmitNewAlternative={alternative =>
          this.handleSubmitNewAlternative(alternative)
        }
      />
    )
  }

  renderCriteria() {
    return (
      <ComparisonCriteria
        matchUrl={this.state.matchUrl}
        criteria={this.comparison.criteria}
        onSubmitNewCriterion={criterion =>
          this.handleSubmitNewCriterion(criterion)
        }
        onSubmitEditCriterion={criterion =>
          this.handleSubmitEditCriterion(criterion)
        }
      />
    )
  }

  renderOneAlternative(routeProps) {
    return (
      <Alternative
        {...routeProps}
        alternatives={this.comparison.alternatives}
        criteria={this.comparison.criteria}
        comparisonMatchUrl={this.state.matchUrl}
      />
    )
  }
}

export default Comparison
