import React, { Component } from 'react'
import ProjectPreview from './ProjectPreview'

class DocWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error: error })
  }

  render() {
    const { code, style } = this.props

    if (this.state.hasError) {
      return (
        <div
          style={{
            width: '100%',
            backgroundColor: '#fff0f0',
            color: 'red',
            fontSize: '1.2em',
            border: '10px solid red',
            padding: '1em',
          }}
        >
          {this.state.error.message}
        </div>
      )
    }

    return <ProjectPreview code={code} style={style} />
  }
}

export default DocWrapper
