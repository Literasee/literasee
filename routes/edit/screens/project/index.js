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
    this.onLayoutChanged = this.onLayoutChanged.bind(this)
    this.onThemeChanged = this.onThemeChanged.bind(this)
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
      this.setState({
        project,
        code: project.source,
        layout: project.layout,
        theme: project.theme,
      })
      this.applyCodeChanges(project.source)
    })
  }

  onSaveChanges() {
    const { project, code, layout, theme } = this.state
    const { owner, name } = project

    return fetch(`/api/save/${owner}/${name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(
        Object.assign({}, project, {
          source: code,
          layout,
          theme,
        }),
      ),
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

  onLayoutChanged(e) {
    this.setState({ layout: e.target.value }, this.applyCodeChanges)
  }

  onThemeChanged(e) {
    this.setState({ theme: e.target.value }, this.applyCodeChanges)
  }

  applyCodeChanges(newCode) {
    const { project, layout, theme } = this.state
    const { owner, name } = project

    let etag = null

    fetch(`/preview/${owner}/${name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        source: newCode || project.source,
        layout: layout || project.layout,
        theme: theme || project.theme,
      }),
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
          project: Object.assign({}, this.state.project, res, {
            etag: etag,
          }),
        })
      })
  }

  onCancelChanges() {
    const { project, layout, theme } = this.state

    this.setState(
      {
        code: project.source,
        layout: project.layout,
        theme: project.theme,
      },
      this.applyCodeChanges,
    )
  }

  saveKeywords() {
    const { params, project, saveFile } = this.props

    saveFile(params, project, 'keywords')
  }

  render() {
    const { project, code, layout, theme } = this.state
    const { match } = this.props

    if (!project) return <h3>Loading...</h3>

    return (
      <div className={styles.container}>
        <ProjectMetadata save={this.saveKeywords} project={project} {...this.props} />
        <ProjectEditor
          params={match.params}
          project={project}
          code={code}
          layout={layout}
          theme={theme}
          onCodeChanged={this.onCodeChanged}
          onLayoutChanged={this.onLayoutChanged}
          onThemeChanged={this.onThemeChanged}
          onCancelChanges={this.onCancelChanges}
          onSaveChanges={this.onSaveChanges}
        />
      </div>
    )
  }
}

export default Project
