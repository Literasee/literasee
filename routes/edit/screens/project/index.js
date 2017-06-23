import React, { Component } from 'react'
import ProjectMetadata from './components/ProjectMetadata'
import ProjectEditor from './components/ProjectEditor'
import debounce from 'lodash/debounce'

import styles from './Project.styl'

class Project extends Component {
  constructor() {
    super()
    this.state = { originalCode: null }

    this.saveKeywords = this.saveKeywords.bind(this)
    this.onCodeChanged = this.onCodeChanged.bind(this)
    this.applyCodeChanges = this.applyCodeChanges.bind(this)
    this.onCancelChanges = this.onCancelChanges.bind(this)
    this.onSaveChanges = this.onSaveChanges.bind(this)

    // don't react to every keystroke
    this.applyCodeChanges = debounce(this.applyCodeChanges, 500)
  }

  fetchProject(params) {
    const { owner, username, project } = params

    return fetch(`/api/${owner || username}/${project}`, {
      credentials: 'include',
    }).then(req => req.json(), err => console.error(err))
  }

  componentDidMount() {
    this.fetchProject(this.props.match.params).then(project => {
      this.setState({ project, code: project.source })
      this.applyCodeChanges(project.source)
    })
  }

  onSaveChanges() {
    const { project, code } = this.state
    const { owner, name } = project

    return fetch(`/api/save/${owner}/${name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(Object.assign({}, project, { source: code })),
    })
      .then(req => req.json(), err => console.error(err))
      .then(res => {
        this.setState({
          project: res,
        })
      })
  }

  onCodeChanged(code) {
    this.setState({ code }, () => {
      this.applyCodeChanges(code)
    })
  }

  applyCodeChanges(newCode) {
    const { project } = this.state
    const { owner, name } = project

    let etag = null

    fetch(`/preview/${owner}/${name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ source: newCode }),
    })
      .then(
        res => {
          etag = res.headers.get('etag')
          return res.json()
        },
        err => console.error(err),
      )
      .then(res => {
        this.setState({
          project: Object.assign({}, this.state.project, {
            html: res.html,
            css: res.css,
            js: res.js,
            etag: etag,
          }),
        })
      })
  }

  onCancelChanges() {
    this.onCodeChanged(this.state.project.source)
  }

  saveKeywords() {
    const { params, project, saveFile } = this.props

    saveFile(params, project, 'keywords')
  }

  render() {
    const { project, code } = this.state
    const { match } = this.props

    if (!project) return <h3>Loading...</h3>

    return (
      <div className={styles.container}>
        <ProjectMetadata save={this.saveKeywords} project={project} {...this.props} />
        <ProjectEditor
          params={match.params}
          project={project}
          code={code}
          onCodeChanged={this.onCodeChanged}
          onCancelChanges={this.onCancelChanges}
          onSaveChanges={this.onSaveChanges}
        />
      </div>
    )
  }
}

export default Project
