import React from "react"
import { Redirect, Switch } from "react-router-dom"
import { Route } from "react-router"

import AppState from "AppState"
import Comparison from "Comparison"
import ComparisonIndex from "ComparisonIndex"
import RouteNotFound from "RouteNotFound"
import SignIn from "SignIn"
import { HeaderSlot } from "Header"

export default AppState.renderWith(render)

function render({
  user,
  server,
  isUserSigningInChanging,
  isUserSigningIn,
  isUserSigningOut,
  onHeaderSlotRef,
  onUserSignIn,
  onUserSignOut
}) {
  const isUserSigningOutClassName = isUserSigningOut
    ? "App_main__isUserSigningOut"
    : ""
  const appClassName = `App_main ${isUserSigningOutClassName}`

  const renderSignInRequiredPartial = renderSignInRequired(
    user,
    isUserSigningInChanging,
    isUserSigningIn,
    onUserSignIn
  )

  const renderRoutePartial = renderRoute(
    renderSignInRequiredPartial,
    appClassName,
    server
  )

  return (
    <div className="App">
      {renderHeader(
        user,
        isUserSigningInChanging,
        isUserSigningIn,
        onHeaderSlotRef,
        onUserSignIn,
        onUserSignOut
      )}
      <Switch>
        <Redirect exact from="/" to="/app/dashboard" />
        <Route
          exact
          path="/app/dashboard"
          render={renderRoutePartial(ComparisonIndex)}
        />
        <Route
          path="/app/comparison/:id"
          render={renderRoutePartial(Comparison)}
        />
        <Route component={RouteNotFound} />
      </Switch>
    </div>
  )
}

function renderHeader(
  user,
  isUserSigningInChanging,
  isUserSigningIn,
  onHeaderSlotRef,
  onUserSignIn,
  onUserSignOut
) {
  return (
    <HeaderSlot
      user={user}
      isUserSigningInChanging={isUserSigningInChanging}
      isUserSigningIn={isUserSigningIn}
      onRef={onHeaderSlotRef}
      onUserSignIn={onUserSignIn}
      onUserSignOut={onUserSignOut}
    />
  )
}

function renderRoute(renderSignInRequiredPartial, appClassName, server) {
  return Component => routeProps =>
    renderSignInRequiredPartial(
      <Component className={appClassName} server={server} {...routeProps} />
    )
}

function renderSignInRequired(
  user,
  isUserSigningInChanging,
  isUserSigningIn,
  onUserSignIn
) {
  return component => {
    if (isUserSigningIn || !user) {
      return renderSignIn(
        isUserSigningInChanging,
        isUserSigningIn,
        onUserSignIn
      )
    } else {
      return component
    }
  }
}

function renderSignIn(isUserSigningInChanging, isUserSigningIn, onUserSignIn) {
  return (
    <SignIn
      className="App_main"
      isUserSigningInChanging={isUserSigningInChanging}
      isUserSigningIn={isUserSigningIn}
      onUserSignIn={onUserSignIn}
    />
  )
}
