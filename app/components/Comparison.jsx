import React from "react"
import { Link, Switch } from "react-router-dom"
import { Route } from "react-router"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Alternative from "Alternative"
import AlternativeIndex from "AlternativeIndex"
import ComparisonInfo from "ComparisonInfo"
import ComparisonState from "ComparisonState"
import CriterionIndex from "CriterionIndex"
import Header from "Header"
import Loading from "Loading"
import RouteNotFound from "RouteNotFound"
import Sidebar from "Sidebar"
import Timing from "Timing"

export default function Comparison(props) {
  const { server, match } = props
  return (
    <ComparisonState
      {...{ server, match }}
      render={stateProps => render({ ...props, ...stateProps })}
    />
  )
}

function render({
  className,
  comparison,
  isLoading,
  location,
  match,
  server,
  onSetComparisonState
}) {
  return (
    <div className="Comparison">
      {renderHeader(comparison, isLoading, match.url)}
      {renderSidebar(match.url)}
      <main className={`Comparison_main ${className}`}>
        {isLoading
          ? renderLoading()
          : renderLoaded(
              comparison,
              location,
              match.url,
              server,
              onSetComparisonState
            )}
      </main>
    </div>
  )
}

function renderHeader(comparison, isLoading, matchUrl) {
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

function renderSidebar(matchUrl) {
  return <Sidebar matchUrl={matchUrl} />
}

function renderLoading() {
  return <Loading />
}

function renderLoaded(
  comparison,
  location,
  matchUrl,
  server,
  onSetComparisonState
) {
  return (
    <React.Fragment>
      {renderContent(
        comparison,
        location,
        matchUrl,
        server,
        onSetComparisonState
      )}
      {renderInfo(comparison, server, onSetComparisonState)}
    </React.Fragment>
  )
}

function renderContent(
  comparison,
  location,
  matchUrl,
  server,
  onSetComparisonState
) {
  return (
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
          {renderSwitch(
            comparison,
            location,
            matchUrl,
            server,
            onSetComparisonState
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}

function renderSwitch(
  comparison,
  location,
  matchUrl,
  server,
  onSetComparisonState
) {
  return (
    <Switch location={location}>
      <Route
        exact
        path={matchUrl}
        render={() =>
          renderAlternatives(comparison, matchUrl, server, onSetComparisonState)
        }
      />
      <Route
        exact
        path={`${matchUrl}/criteria`}
        render={() =>
          renderCriteria(comparison, matchUrl, server, onSetComparisonState)
        }
      />
      <Route
        exact
        path={`${matchUrl}/alternative/:id`}
        render={({ match }) =>
          renderOneAlternative(
            comparison,
            match,
            matchUrl,
            server,
            onSetComparisonState
          )
        }
      />
      <Route component={RouteNotFound} />
    </Switch>
  )
}

function renderAlternatives(
  comparison,
  matchUrl,
  server,
  onSetComparisonState
) {
  return (
    <AlternativeIndex
      matchUrl={matchUrl}
      comparison={comparison}
      server={server}
      onSetComparisonState={onSetComparisonState}
    />
  )
}

function renderCriteria(comparison, matchUrl, server, onSetComparisonState) {
  return (
    <CriterionIndex
      matchUrl={matchUrl}
      comparison={comparison}
      server={server}
      onSetComparisonState={onSetComparisonState}
    />
  )
}

function renderOneAlternative(
  comparison,
  match,
  parentMatchUrl,
  server,
  onSetComparisonState
) {
  return (
    <Alternative
      match={match}
      parentMatchUrl={parentMatchUrl}
      comparison={comparison}
      server={server}
      onSetComparisonState={onSetComparisonState}
    />
  )
}

function renderInfo(comparison, server, onSetComparisonState) {
  return (
    <ComparisonInfo
      className="Comparison_section"
      comparison={comparison}
      server={server}
      onSetComparisonState={onSetComparisonState}
    />
  )
}
