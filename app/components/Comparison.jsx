import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import axios from "axios"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import RouteNotFound from "RouteNotFound"
import Alternative from "Alternative"
import EditComparison from "EditComparison"
import ComparisonAlternatives from "ComparisonAlternatives"
import ComparisonCriteria from "ComparisonCriteria"
import Header from "Header"
import Loading from "Loading"
import Sidebar from "Sidebar"
import Button from "Button"
import Timing from "Timing"

export default class Comparison extends React.Component {
  constructor({ match }) {
    super()
    const { params: { id } } = match
    this.state = {
      isLoading: true,
      isEditing: false,
      isEditStateChanging: false,
      isAlternativeNewlyCreated: false,
      isCriterionNewlyCreated: false,
      comparison: null
    }
    this.load(id)
  }

  get matchUrl() {
    return this.props.match.url
  }

  get location() {
    return this.props.location
  }

  get isLoading() {
    return this.state.isLoading
  }

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
  }

  get editStateChangingClassName() {
    return this.isEditStateChanging
      ? "Comparison_infoEditContent__isChangingState"
      : ""
  }

  get isAlternativeNewlyCreated() {
    return this.state.isAlternativeNewlyCreated
  }

  get isCriterionNewlyCreated() {
    return this.state.isCriterionNewlyCreated
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
        alternatives: [response.data].concat(this.comparison.alternatives)
      },
      isAlternativeNewlyCreated: true
    })
    await Timing.comparisonAlternativesHighlightLink()
    this.setState({
      ...this.state,
      isAlternativeNewlyCreated: false
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
      },
      isCriterionNewlyCreated: true
    })
    await Timing.comparisonCriteriaPopIn()
    this.setState({
      ...this.state,
      isCriterionNewlyCreated: false
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

  async handleSubmitResetEstimate(alternative, estimate) {
    console.log("Deleting estimate", estimate)
    await axios.delete(`/estimates/${estimate.id}`)
    this.setState({
      ...this.state,
      comparison: {
        ...this.comparison,
        alternatives: this.comparison.alternatives.map(
          item =>
            item.id === alternative.id
              ? {
                  ...item,
                  estimates: item.estimates.filter(
                    innerItem => innerItem.id !== estimate.id
                  )
                }
              : item
        )
      }
    })
  }

  async handleBeginEdit() {
    this.setState({
      ...this.state,
      isEditStateChanging: true
    })
    await Timing.comparisonEditStateChange()
    this.setState({
      ...this.state,
      isEditing: true,
      isEditStateChanging: false
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
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    this.setState({
      ...this.state,
      isEditStateChanging: true
    })
    await Timing.comparisonEditStateChange()
    this.setState({
      ...this.state,
      isEditing: false,
      isEditStateChanging: false
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
        <nav className="Header_titleContent">
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
          <TransitionGroup>
            <CSSTransition
              key={this.location.pathname}
              classNames="Comparison_navigate"
              timeout={{
                exit: Timing.comparisonRouteChange,
                enter: Timing.comparisonRouteChange * 2
              }}
            >
              <Switch location={this.location}>
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
            </CSSTransition>
          </TransitionGroup>
        </div>
        {this.renderInfo()}
      </React.Fragment>
    )
  }

  renderInfo() {
    return (
      <section className="Comparison_infoEditSection">
        <div
          className={`Comparison_infoEditContent ${
            this.editStateChangingClassName
          }`}
        >
          {!this.isEditing ? this.renderEditButton() : this.renderEditForm()}
        </div>
      </section>
    )
  }

  renderEditButton() {
    return (
      <Button
        className="Comparison_infoEditButton"
        onClick={() => this.handleBeginEdit()}
      >
        Edit comparison info for {this.comparison.name}
      </Button>
    )
  }

  renderEditForm() {
    return (
      <EditComparison
        comparison={this.comparison}
        onSubmit={comparison => this.handleSubmitEdit(comparison)}
        onCancel={() => this.handleCancelEdit()}
      />
    )
  }

  renderAlternatives() {
    return (
      <ComparisonAlternatives
        matchUrl={this.matchUrl}
        alternatives={this.comparison.alternatives}
        isAlternativeNewlyCreated={this.isAlternativeNewlyCreated}
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
        isCriterionNewlyCreated={this.isCriterionNewlyCreated}
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
        parentMatchUrl={this.matchUrl}
        parentTitle="Alternatives"
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
        onSubmitResetEstimate={(alternative, estimate) =>
          this.handleSubmitResetEstimate(alternative, estimate)
        }
      />
    )
  }
}
