import React, { Component } from 'react'
import { Link } from 'react-router'
import ProjectAdminTile from './components/ProjectAdminTile'
import _ from 'lodash'

import styles from './Admin.styl'

class Admin extends Component {
  render() {
    const { projects, params, username, setProjectsIgnoredState } = this.props
    const [ignoredProjects, activeProjects] = _.partition(projects, p => {
      return p.isIgnored
    })

    const activateProject = pId => {
      setProjectsIgnoredState(username, [pId], false)
    }
    const ignoreProject = pId => {
      setProjectsIgnoredState(username, [pId], true)
    }
    const ignoreAll = () => {
      setProjectsIgnoredState(username, _.map(activeProjects, 'id'), true)
    }
    const showAll = () => {
      setProjectsIgnoredState(username, _.map(ignoredProjects, 'id'), false)
    }

    return (
      <div className={styles.container}>
        <div>
          <Link to={'/' + params.username} className={styles.backBtn}>
            <img src="/public/img/icon-back.png" /> Back
          </Link>
        </div>
        <div className={styles.listPane}>
          <div className={styles.listHeader}>
            <h5>Literasee Projects</h5>
            <button onClick={ignoreAll}>Ignore All</button>
          </div>
          <div className={styles.listContainer}>
            {activeProjects.map(p => {
              return (
                <ProjectAdminTile
                  key={p.id}
                  project={p}
                  onClick={ignoreProject.bind(null, p.id)}
                />
              )
            })}
          </div>
        </div>
        <div className={styles.listPane}>
          <div className={styles.listHeader}>
            <h5>Ignored Projects</h5>
            <button onClick={showAll}>Show All</button>
          </div>
          <div className={styles.listContainer}>
            {ignoredProjects.map(p => {
              return (
                <ProjectAdminTile
                  key={p.id}
                  project={p}
                  onClick={activateProject.bind(null, p.id)}
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Admin
