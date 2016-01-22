import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePath } from 'redux-simple-router'

import ProjectGrid from 'components/ProjectGrid'

class App extends Component {
  componentDidMount () {
    const { username, redirectToUserHome } = this.props

    // if (username) {
    //   redirectToUserHome(username)
    // }
  }

  render () {
    const { gists } = this.props

    return (
      <div>
        <main role='main' className='section-dimmed'>
          <ProjectGrid gists={gists} />
        </main>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    username: state.username,
    gists: state.gists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    redirectToUserHome: (username) => {
      dispatch(updatePath('/' + username))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
