import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Alternative from "Alternative"
import AlternativeIndex from "AlternativeIndex"
import Button from "Button"
import CriterionIndex from "CriterionIndex"
import EditComparison from "EditComparison"
import Header from "Header"
import Loading from "Loading"
import RouteNotFound from "RouteNotFound"
import Sidebar from "Sidebar"
import Timing from "Timing"

export default function ComparisonRender({
  className,
  comparison,
  handlers,
  isAlternativeNewlyCreated,
  isCriterionNewlyCreated,
  isEditStateChanging,
  isEditing,
  isLoading,
  location,
  matchUrl
}) {
  const editStateChangingClassName = isEditStateChanging
    ? "Comparison_infoEditContent__isChangingState"
    : ""

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
        {renderInfo()}
      </React.Fragment>
    )
  }

  function renderInfo() {
    return (
      <section className="Comparison_infoEditSection">
        <div
          className={`Comparison_infoEditContent ${editStateChangingClassName}`}
        >
          {!isEditing ? renderEditButton() : renderEditForm()}
        </div>
      </section>
    )
  }

  function renderEditButton() {
    return (
      <Button
        className="Comparison_infoEditButton"
        onClick={() => handlers.handleBeginEdit()}
      >
        Edit comparison info for {comparison.name}
      </Button>
    )
  }

  function renderEditForm() {
    return (
      <EditComparison
        comparison={comparison}
        onSubmit={comparison => handlers.handleSubmitEdit(comparison)}
        onCancel={() => handlers.handleCancelEdit()}
      />
    )
  }

  function renderAlternatives() {
    return (
      <AlternativeIndex
        matchUrl={matchUrl}
        alternatives={comparison.alternatives}
        isAlternativeNewlyCreated={isAlternativeNewlyCreated}
        onSubmitNewAlternative={alternative =>
          handlers.handleSubmitNewAlternative(alternative)
        }
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
