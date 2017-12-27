import React from "react"
import PropTypes from "prop-types"

class HeaderContent extends React.Component {
  static contextTypes = {
    headerContent: PropTypes.func
  }

  get children() {
    return this.props.children
  }

  get headerContent() {
    return this.context.headerContent
  }

  componentWillMount() {
    this.renderOther()
  }

  shouldComponentUpdate() {
    return false
  }

  renderOther() {
    if (this.headerContent) {
      this.headerContent(this.children)
    }
  }

  render() {
    return null
  }
}

export default HeaderContent
