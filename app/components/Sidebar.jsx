import React from "react"
import { matchPath } from "react-router"
import { Link, NavLink } from "react-router-dom"
import MdKeyboardArrowLeft from "react-icons/lib/md/keyboard-arrow-left"

export default function Sidebar({ matchUrl }) {
  const criteriaLinkIsActive = (_match, location) =>
    matchPath(location.pathname, { path: `${matchUrl}/criteria` })
  const alternativesLinkIsActive = (match, location) =>
    !criteriaLinkIsActive(match, location)
  return (
    <nav className="Sidebar">
      <Link className="Sidebar_link Sidebar_link__toDashboard" to="/dashboard">
        <MdKeyboardArrowLeft className="Sidebar_icon" /> Dashboard
      </Link>
      <NavLink
        className="Sidebar_link"
        activeClassName="Sidebar_link__isActive"
        isActive={alternativesLinkIsActive}
        to={matchUrl}
      >
        Alternatives
      </NavLink>
      <NavLink
        className="Sidebar_link"
        activeClassName="Sidebar_link__isActive"
        isActive={criteriaLinkIsActive}
        to={`${matchUrl}/criteria`}
      >
        Criteria
      </NavLink>
    </nav>
  )
}
