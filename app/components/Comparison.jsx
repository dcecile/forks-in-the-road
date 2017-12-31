import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import axios from "axios"
import RouteNotFound from "RouteNotFound"
import Alternative from "Alternative"
import EditComparison from "EditComparison"
import ComparisonAlternatives from "ComparisonAlternatives"
import ComparisonCriteria from "ComparisonCriteria"
import Header from "Header"
import Loading from "Loading"
import Sidebar from "Sidebar"
import Button from "Button"

class Comparison extends React.Component {
  constructor({ match }) {
    super()
    const { params: { id } } = match
    this.state = {
      isLoading: true,
      isEditing: false,
      comparison: null
    }
    this.load(id)
  }

  get matchUrl() {
    return this.props.match.url
  }

  get isLoading() {
    return this.state.isLoading
  }

  get isEditing() {
    return this.state.isEditing
  }

  get comparison() {
    return this.state.comparison
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

  async handleSubmitEditAlternative(alternative) {
    console.log("Patching alternative", alternative)
    const response = await axios.patch(
      `/alternatives/${alternative.id}`,
      alternative
    )
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        alternatives: this.comparison.alternatives.map(
          item =>
            item.id === alternative.id ? { ...item, ...response.data } : item
        )
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

  async handleSubmitNewEstimate(alternative, estimate) {
    console.log("Posting new estimate", estimate)
    const response = await axios.post(
      `/alternatives/${alternative.id}/estimates`,
      estimate
    )
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        alternatives: this.comparison.alternatives.map(
          item =>
            item.id === alternative.id
              ? { ...item, estimates: item.estimates.concat(response.data) }
              : item
        )
      }
    })
  }

  async handleSubmitEditEstimate(alternative, estimate) {
    console.log("Patching estimate", estimate)
    const response = await axios.patch(`/estimates/${estimate.id}`, estimate)
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        alternatives: this.comparison.alternatives.map(
          item =>
            item.id === alternative.id
              ? {
                  ...item,
                  estimates: item.estimates.map(
                    innerItem =>
                      innerItem.id === estimate.id ? response.data : innerItem
                  )
                }
              : item
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

  render() {
    return (
      <div className="Comparison">
        {this.renderHeader()}
        {this.renderSidebar()}
        <main className="Comparison_main">
          {this.isLoading ? this.renderLoading() : this.renderLoaded()}
        </main>
      </div>
    )
  }

  renderHeader() {
    const text = this.isLoading ? (
      <React.Fragment>Loading&hellip;</React.Fragment>
    ) : (
      this.comparison.name
    )
    return (
      <Header className="Header__comparisonMode">
        <nav className="Header_title">
          <Link to={this.matchUrl}>{text}</Link>
        </nav>
      </Header>
    )
  }

  renderSidebar() {
    return <Sidebar matchUrl={this.matchUrl} />
  }

  renderLoading() {
    return <Loading />
  }

  renderLoaded() {
    return (
      <React.Fragment>
        <div className="Comparison_section">
          <Switch>
            <Route
              exact
              path={this.matchUrl}
              render={() => this.renderAlternatives()}
            />
            <Route
              exact
              path={`${this.matchUrl}/criteria`}
              render={() => this.renderCriteria()}
            />
            <Route
              exact
              path={`${this.matchUrl}/alternative/:id`}
              render={routeProps => this.renderOneAlternative(routeProps)}
            />
            <Route component={RouteNotFound} />
          </Switch>
        </div>
        {this.renderInfo()}
      </React.Fragment>
    )
  }

  renderInfo() {
    return (
      <section className="Comparison_section">
        {!this.isEditing ? this.renderEditButton() : this.renderEdit()}
      </section>
    )
  }

  renderEditButton() {
    return (
      <Button
        className="Comparison_infoEditButton"
        onClick={() => this.handleBeginEdit()}
      >
        Edit comparison info
      </Button>
    )
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
        matchUrl={this.matchUrl}
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
        matchUrl={this.matchUrl}
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
        comparisonMatchUrl={this.matchUrl}
        onSubmitEditAlternative={alternative =>
          this.handleSubmitEditAlternative(alternative)
        }
        onSubmitNewEstimate={(alternative, estimate) =>
          this.handleSubmitNewEstimate(alternative, estimate)
        }
        onSubmitEditEstimate={(alternative, estimate) =>
          this.handleSubmitEditEstimate(alternative, estimate)
        }
      />
    )
  }
}

export default Comparison
