import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Alternative from "Alternative"
import Button from "Button"
import ComparisonAlternatives from "ComparisonAlternatives"
import ComparisonCriteria from "ComparisonCriteria"
import EditComparison from "EditComparison"
import Header from "Header"
import Loading from "Loading"
import RouteNotFound from "RouteNotFound"
import Sidebar from "Sidebar"
import Timing from "Timing"

export default class Comparison extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      isEditing: false,
      isEditStateChanging: false,
      isAlternativeNewlyCreated: false,
      isCriterionNewlyCreated: false,
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

  get isEditing() {
    return this.state.isEditing
  }

  get isEditStateChanging() {
    return this.state.isEditStateChanging
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

  get matchUrl() {
    return this.match.url
  }

  get editStateChangingClassName() {
    return this.isEditStateChanging
      ? "Comparison_infoEditContent__isChangingState"
      : ""
  }

  setComparisonState(comparisonChanges) {
    this.setState({
      comparison: {
        ...this.comparison,
        ...comparisonChanges
      }
    })
  }

  setAlternativeState(alternative, alternativeChanges) {
    this.setComparisonState({
      alternatives: this.comparison.alternatives.map(
        item =>
          item === alternative
            ? { ...alternative, ...alternativeChanges }
            : item
      )
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

  async handleSubmitNewAlternative(alternative) {
    console.log("Posting new alternative", alternative)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/alternatives`,
      alternative
    )
    this.setComparisonState({
      alternatives: [response.data].concat(this.comparison.alternatives)
    })
    this.setState({
      isAlternativeNewlyCreated: true
    })
    await Timing.comparisonAlternativesHighlightLink()
    this.setState({
      isAlternativeNewlyCreated: false
    })
  }

  async handleSubmitEditAlternative(alternative) {
    console.log("Patching alternative", alternative)
    const response = await this.server.patch(
      `/alternatives/${alternative.id}`,
      alternative
    )
    this.setAlternativeState(alternative, response.data)
  }

  async handleSubmitNewCriterion(criterion) {
    console.log("Posting new criterion", criterion)
    const response = await this.server.post(
      `/comparisons/${this.comparison.id}/criteria`,
      criterion
    )
    this.setComparisonState({
      criteria: this.comparison.criteria.concat(response.data)
    })
    this.setState({
      isCriterionNewlyCreated: true
    })
    await Timing.comparisonCriteriaPopIn()
    this.setState({
      isCriterionNewlyCreated: false
    })
  }

  async handleSubmitEditCriterion(criterion) {
    console.log("Patching criterion", criterion)
    const response = await this.server.patch(
      `/criteria/${criterion.id}`,
      criterion
    )
    this.setComparisonState({
      criteria: this.comparison.criteria.map(
        item => (item === criterion ? { ...criterion, ...response.data } : item)
      )
    })
  }

  async handleSubmitNewEstimate(alternative, estimate) {
    console.log("Posting new estimate", estimate)
    const response = await this.server.post(
      `/alternatives/${alternative.id}/estimates`,
      estimate
    )
    this.setAlternativeState(alternative, {
      estimates: alternative.estimates.concat(response.data)
    })
  }

  async handleSubmitEditEstimate(alternative, estimate) {
    console.log("Patching estimate", estimate)
    const response = await this.server.patch(
      `/estimates/${estimate.id}`,
      estimate
    )
    this.setAlternativeState(alternative, {
      estimates: alternative.estimates.map(
        item => (item === estimate ? { ...estimate, ...response.data } : item)
      )
    })
  }

  async handleSubmitResetEstimate(alternative, estimate) {
    console.log("Deleting estimate", estimate)
    await this.server.delete(`/estimates/${estimate.id}`)
    this.setAlternativeState(alternative, {
      estimates: alternative.estimates.filter(item => item !== estimate)
    })
  }

  async handleBeginEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.comparisonEditStateChange()
    this.setState({
      isEditing: true,
      isEditStateChanging: false
    })
  }

  async handleSubmitEdit(comparison) {
    console.log("Patching comparison", comparison)
    const response = await this.server.patch(
      `/comparisons/${this.comparison.id}`,
      comparison
    )
    this.setComparisonState(response.data)
    await this.handleCancelEdit()
  }

  async handleCancelEdit() {
    this.setState({
      isEditStateChanging: true
    })
    await Timing.comparisonEditStateChange()
    this.setState({
      isEditing: false,
      isEditStateChanging: false
    })
  }

  render() {
    return (
      <div className="Comparison">
        {this.renderHeader()}
        {this.renderSidebar()}
        <main className={`Comparison_main ${this.className}`}>
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
