import React from "react"
import { Link } from "react-router-dom"

import ComparisonIndexState from "ComparisonIndexState"
import Header from "Header"
import Loading from "Loading"
import NewComparison from "NewComparison"

export default ComparisonIndexState.renderWith(render)

function render({
  className,
  match,
  isLoading,
  comparisonStubs,
  onSubmitNewComparison
}) {
  const matchUrl = match.url

  return (
    <main className={`ComparisonIndex ${className}`}>
      <Header className="Header__dashboardMode">
        <h1 className="Header_titleContent">
          <Link to={matchUrl}>Dashboard</Link>
        </h1>
      </Header>
      {isLoading
        ? renderLoading()
        : renderLoaded(onSubmitNewComparison, comparisonStubs)}
    </main>
  )
}

function renderLoading() {
  return <Loading />
}

function renderLoaded(onSubmitNewComparison, comparisonStubs) {
  return (
    <React.Fragment>
      <NewComparison
        className="ComparisonIndex_item"
        onSubmit={onSubmitNewComparison}
      />
      {comparisonStubs.map(comparisonStub =>
        renderComparisonStub(
          comparisonStub.id,
          comparisonStub.name,
          comparisonStub.alternatives_size
        )
      )}
    </React.Fragment>
  )
}

function renderComparisonStub(id, name, size) {
  return (
    <Link
      key={id}
      className="ComparisonIndex_item"
      to={`/app/comparison/${id}`}
    >
      <h2 className="ComparisonIndex_itemHeader">{name}</h2>
      <h3 className="ComparisonIndex_itemSubHeader">{size} alternatives</h3>
    </Link>
  )
}
