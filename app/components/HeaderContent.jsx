import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"

class HeaderContent extends React.Component {
  static contextTypes = {
    headerContent: PropTypes.instanceOf(HTMLElement)
  }

  get children() {
    return this.props.children
  }

  get headerContent() {
    return this.context.headerContent
  }

  render() {
    return this.headerContent
      ? ReactDOM.createPortal(this.children, this.headerContent)
      : null
  }
}

export default HeaderContent
