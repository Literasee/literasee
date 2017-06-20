import React, { Component } from 'react'
import ProjectMetadata from './components/ProjectMetadata'
import ProjectEditor from './components/ProjectEditor'
import { getProjectViewUrl } from 'utils/urlUtil'
import debounce from 'lodash/debounce'

import styles from './Project.styl'

class Project extends Component {
  constructor() {
    super()
    this.state = { originalCode: null }

    this.saveKeywords = this.saveKeywords.bind(this)
    this.onCodeChanged = this.onCodeChanged.bind(this)
    this.onCancelChanges = this.onCancelChanges.bind(this)
    this.onSaveChanges = this.onSaveChanges.bind(this)

    // don't react to every keystroke
    this.onCodeChanged = debounce(this.onCodeChanged, 250)
  }

  fetchProject(params) {
    const { owner, username, project } = params

    return fetch(`/api/${owner || username}/${project}`, {
      credentials: 'include',
    }).then(req => req.json(), err => console.error(err))
  }

  componentDidMount() {
    this.fetchProject(this.props.match.params).then(project => {
      this.setState({ project })
    })
  }

  onSaveChanges() {
    const { project } = this.state
    const { owner, name } = project

    return fetch(`/api/save/${owner}/${name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ project }),
    })
      .then(req => req.json(), err => console.error(err))
      .then(res => console.log(res))
  }

  onCodeChanged(newCode) {
    this.setState({
      project: Object.assign({}, this.state.project, { source: newCode }),
    })
  }

  onCancelChanges() {
    if (this.state.originalCode) this.onCodeChanged(this.state.originalCode)
  }

  saveKeywords() {
    const { params, project, saveFile } = this.props

    saveFile(params, project, 'keywords')
  }

  render() {
    const { project } = this.state
    const { match } = this.props

    if (!project) return <h3>Loading...</h3>

    return (
      <div className={styles.container}>
        <ProjectMetadata save={this.saveKeywords} project={project} {...this.props} />
        <ProjectEditor
          params={match.params}
          project={project}
          onCodeChanged={this.onCodeChanged}
          onCancelChanges={this.onCancelChanges}
          onSaveChanges={this.onSaveChanges}
        />
      </div>
    )
  }
}

export default Project
