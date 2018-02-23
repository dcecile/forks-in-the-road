import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Alternative from "Alternative"
import AlternativeIndex from "AlternativeIndex"
import ComparisonInfo from "ComparisonInfo"
import CriterionIndex from "CriterionIndex"
import Header from "Header"
import Loading from "Loading"
import RouteNotFound from "RouteNotFound"
import Sidebar from "Sidebar"
import Timing from "Timing"

export default function ComparisonRender({
  className,
  comparison,
  handlers,
  isCriterionNewlyCreated,
  isLoading,
  location,
  matchUrl,
  server,
  onSetComparisonState
}) {
  function render() {
    return (
      <div className="Comparison">
        {renderHeader()}
        {renderSidebar()}
        <main className={`Comparison_main ${className}`}>
          {isLoading ? renderLoading() : renderLoaded()}
        </main>
      </div>
    )
  }

  function renderHeader() {
    const text = isLoading ? (
      <React.Fragment>Loading&hellip;</React.Fragment>
    ) : (
      comparison.name
    )
    return (
      <Header className="Header__comparisonMode">
        <nav className="Header_titleContent">
          <Link to={matchUrl}>{text}</Link>
        </nav>
      </Header>
    )
  }

  function renderSidebar() {
    return <Sidebar matchUrl={matchUrl} />
  }

  function renderLoading() {
    return <Loading />
  }

  function renderLoaded() {
    return (
      <React.Fragment>
        <div className="Comparison_section">
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="Comparison_navigate"
              timeout={{
                exit: Timing.comparisonRouteChange,
                enter: Timing.comparisonRouteChange * 2
              }}
            >
              <Switch location={location}>
                <Route
                  exact
                  path={matchUrl}
                  render={() => renderAlternatives()}
                />
                <Route
                  exact
                  path={`${matchUrl}/criteria`}
                  render={() => renderCriteria()}
                />
                <Route
                  exact
                  path={`${matchUrl}/alternative/:id`}
                  render={routeProps => renderOneAlternative(routeProps)}
                />
                <Route component={RouteNotFound} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <ComparisonInfo
          className="Comparison_section"
          comparison={comparison}
          server={server}
          onSetComparisonState={onSetComparisonState}
        />
      </React.Fragment>
    )
  }

  function renderAlternatives() {
    return (
      <AlternativeIndex
        matchUrl={matchUrl}
        comparison={comparison}
        server={server}
        onSetComparisonState={onSetComparisonState}
      />
    )
  }

  function renderCriteria() {
    return (
      <CriterionIndex
        matchUrl={matchUrl}
        criteria={comparison.criteria}
        isCriterionNewlyCreated={isCriterionNewlyCreated}
        onSubmitNewCriterion={criterion =>
          handlers.handleSubmitNewCriterion(criterion)
        }
        onSubmitEditCriterion={criterion =>
          handlers.handleSubmitEditCriterion(criterion)
        }
      />
    )
  }

  function renderOneAlternative(routeProps) {
    return (
      <Alternative
        {...routeProps}
        parentMatchUrl={matchUrl}
        parentTitle="Alternatives"
        alternatives={comparison.alternatives}
        criteria={comparison.criteria}
        comparisonMatchUrl={matchUrl}
        onSubmitEditAlternative={alternative =>
          handlers.handleSubmitEditAlternative(alternative)
        }
        onSubmitNewEstimate={(alternative, estimate) =>
          handlers.handleSubmitNewEstimate(alternative, estimate)
        }
        onSubmitEditEstimate={(alternative, estimate) =>
          handlers.handleSubmitEditEstimate(alternative, estimate)
        }
        onSubmitResetEstimate={(alternative, estimate) =>
          handlers.handleSubmitResetEstimate(alternative, estimate)
        }
      />
    )
  }

  return render()
}
