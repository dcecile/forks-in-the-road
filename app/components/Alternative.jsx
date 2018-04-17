import MdOpenInNew from "react-icons/lib/md/open-in-new"
import React from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import AlternativeState from "AlternativeState"
import Button from "Button"
import ComparisonHeader from "ComparisonHeader"
import EditAlternative from "EditAlternative"
import Estimate from "Estimate"
import Timing from "Timing"
import { findEstimate } from "ValueCalculation"

export default AlternativeState.renderWith(render)

function render({
  match,
  parentMatchUrl,
  comparison,
  alternative,
  isEditing,
  onBeginEdit,
  onSubmitEdit,
  onCancelEdit,
  onSubmitNewEstimate,
  onSubmitEditEstimate,
  onSubmitResetEstimate
}) {
  return (
    <div className="Alternative">
      {renderInfo(
        match.url,
        parentMatchUrl,
        alternative,
        isEditing,
        onBeginEdit,
        onSubmitEdit,
        onCancelEdit
      )}
      <div className="Alternative_items">
        {renderEstimates(
          alternative,
          comparison.criteria,
          comparison.value_unit,
          onSubmitNewEstimate,
          onSubmitEditEstimate,
          onSubmitResetEstimate
        )}
      </div>
    </div>
  )
}

function renderInfo(
  matchUrl,
  parentMatchUrl,
  alternative,
  isEditing,
  onBeginEdit,
  onSubmitEdit,
  onCancelEdit
) {
  return (
    <TransitionGroup>
      <CSSTransition
        key={!isEditing}
        classNames="Alternative_headerTransition"
        timeout={{
          exit: Timing.alternativeEditStateChange,
          enter: Timing.alternativeEditStateChange * 2
        }}
      >
        {!isEditing
          ? renderHeaders(matchUrl, parentMatchUrl, alternative, onBeginEdit)
          : renderEdit(alternative, onSubmitEdit, onCancelEdit)}
      </CSSTransition>
    </TransitionGroup>
  )
}

function renderHeaders(matchUrl, parentMatchUrl, alternative, onBeginEdit) {
  return (
    <div className="Alternative_headers">
      {renderHeader(matchUrl, parentMatchUrl, alternative, onBeginEdit)}
      {renderSubHeader(alternative)}
    </div>
  )
}

function renderHeader(matchUrl, parentMatchUrl, alternative, onBeginEdit) {
  return (
    <ComparisonHeader
      matchUrl={matchUrl}
      title={alternative.name}
      parentMatchUrl={parentMatchUrl}
      parentTitle="Alternatives"
    >
      <Button className="Alternative_editButton" onClick={onBeginEdit}>
        Edit
      </Button>
    </ComparisonHeader>
  )
}

function renderSubHeader(alternative) {
  return (
    alternative.url && (
      <h2 className="Alternative_subHeader">
        <a href={alternative.url} target="_blank">
          (external link){" "}
          <MdOpenInNew className="Alternative_externalLinkIcon" />
        </a>
      </h2>
    )
  )
}

function renderEdit(alternative, onSubmitEdit, onCancelEdit) {
  return (
    <EditAlternative
      className="Alternative_edit"
      input={alternative}
      onSubmit={onSubmitEdit}
      onCancel={onCancelEdit}
    />
  )
}

function renderEstimates(
  alternative,
  criteria,
  valueUnit,
  onSubmitNewEstimate,
  onSubmitEditEstimate,
  onSubmitResetEstimate
) {
  return criteria.map(criterion =>
    renderEstimate(
      criterion,
      findEstimate(alternative.estimates, criterion),
      valueUnit,
      onSubmitNewEstimate,
      onSubmitEditEstimate,
      onSubmitResetEstimate
    )
  )
}

function renderEstimate(
  criterion,
  estimate,
  valueUnit,
  onSubmitNewEstimate,
  onSubmitEditEstimate,
  onSubmitResetEstimate
) {
  return (
    <Estimate
      key={criterion.id}
      className="Alternative_item"
      estimate={estimate}
      criterion={criterion}
      valueUnit={valueUnit}
      onSubmitNew={onSubmitNewEstimate}
      onSubmitEdit={onSubmitEditEstimate}
      onSubmitReset={onSubmitResetEstimate}
    />
  )
}
