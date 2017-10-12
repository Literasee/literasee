import React, { Component } from 'react'
import ProjectMetadata from './components/ProjectMetadata'
import ProjectEditor from './components/ProjectEditor'
import debounce from 'lodash/debounce'

import styles from './Project.styl'
import { layouts, themes } from './IdyllStyles'

const applyStylesheet = (styleTagID, css) => {
  const sheetToBeRemoved = document.getElementById(styleTagID)
  if (sheetToBeRemoved) {
    sheetToBeRemoved.parentNode.removeChild(sheetToBeRemoved)
  }

  const sheet = document.createElement('style')
  sheet.id = styleTagID
  sheet.innerHTML = css
  document.body.appendChild(sheet)
}

class Project extends Component {
  constructor() {
    super()
    this.state = { originalCode: null }

    this.saveKeywords = this.saveKeywords.bind(this)
    this.onCodeChanged = this.onCodeChanged.bind(this)
    this.onLayoutChanged = this.onLayoutChanged.bind(this)
    this.onThemeChanged = this.onThemeChanged.bind(this)
    this.onCancelChanges = this.onCancelChanges.bind(this)
    this.onSaveChanges = this.onSaveChanges.bind(this)
  }

  fetchProject(params) {
    const { owner, username, project } = params

    return fetch(`/api/${owner || username}/${project}`, {
      credentials: 'include',
    }).then(req => req.json(), err => console.error(err))
  }

  componentDidMount() {
    this.fetchProject(this.props.match.params).then(project => {
      this.setState(
        {
          project,
          code: project.source,
          layout: project.layout,
          theme: project.theme,
        },
        () => {
          applyStylesheet('layoutStyles', layouts[project.layout])
          applyStylesheet('themeStyles', themes[project.theme])
        },
      )
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
    this.setState({ code })
  }

  onLayoutChanged(e) {
    this.setState(
      { layout: e.target.value },
      applyStylesheet('layoutStyles', layouts[e.target.value]),
    )
  }

  onThemeChanged(e) {
    this.setState(
      { theme: e.target.value },
      applyStylesheet('themeStyles', themes[e.target.value]),
    )
  }

  onCancelChanges() {
    const { project, layout, theme } = this.state

    this.setState({
      code: project.source,
      layout: project.layout,
      theme: project.theme,
    })
  }

  saveKeywords() {
    const { params, project, saveFile } = this.props

    saveFile(params, project, 'keywords')
  }

  render() {
    const { project, code, layout, theme, isPreviewCurrent } = this.state
    const { match } = this.props

    if (!project) return <h3>Loading...</h3>

    return (
      <div className={styles.container}>
        <ProjectMetadata
          save={this.saveKeywords}
          project={project}
          {...this.props}
        />
        <ProjectEditor
          params={match.params}
          project={project}
          code={code}
          layout={layout}
          theme={theme}
          isPreviewCurrent={isPreviewCurrent}
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
