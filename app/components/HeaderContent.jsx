import React from "react"
import PropTypes from "prop-types"

class HeaderContent extends React.Component {
  static contextTypes = {
    headerContent: PropTypes.func
  }

  constructor(_, { headerContent }) {
    super()
    this.headerContent = headerContent
  }

  componentWillMount() {
    this.renderOther()
  }

  shouldComponentUpdate() {
    return false
  }

  renderOther() {
    if (this.headerContent) {
      this.headerContent(this.props.children)
    }
  }

  render() {
    return null
  }
}

export default HeaderContent
