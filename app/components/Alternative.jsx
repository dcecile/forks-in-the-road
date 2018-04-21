import MdOpenInNew from "react-icons/lib/md/open-in-new"
import React from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import AlternativeState from "AlternativeState"
import Button from "Button"
import ComparisonHeader from "ComparisonHeader"
import EditAlternative from "EditAlternative"
import Estimate from "Estimate"
import Timing from "Timing"
import { calculateAlternativeValue, findEstimate } from "ValueCalculation"
import { convertValueToString } from "ValueFormat"
import { defaultValueUnitIfNull } from "ComparisonFields"

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
        comparison.criteria,
        comparison.value_unit,
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
  criteria,
  valueUnit,
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
          ? renderHeaders(
              matchUrl,
              parentMatchUrl,
              alternative,
              criteria,
              valueUnit,
              onBeginEdit
            )
          : renderEdit(alternative, onSubmitEdit, onCancelEdit)}
      </CSSTransition>
    </TransitionGroup>
  )
}

function renderHeaders(
  matchUrl,
  parentMatchUrl,
  alternative,
  criteria,
  valueUnit,
  onBeginEdit
) {
  return (
    <div className="Alternative_headers">
      {renderHeader(matchUrl, parentMatchUrl, alternative, onBeginEdit)}
      {renderValue(alternative, criteria, valueUnit)}
      {renderLink(alternative)}
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

function renderLink(alternative) {
  return (
    alternative.url && (
      <p className="Alternative_link">
        <a href={alternative.url} target="_blank">
          (external link){" "}
          <MdOpenInNew className="Alternative_externalLinkIcon" />
        </a>
      </p>
    )
  )
}

function renderValue(alternative, criteria, valueUnit) {
  const expectedValueString = convertValueToString(
    defaultValueUnitIfNull(valueUnit),
    calculateAlternativeValue(alternative, criteria)
  )
  return <p className="Alternative_value">{expectedValueString}</p>
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
