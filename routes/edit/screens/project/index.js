import React, { Component } from 'react'
import ProjectMetadata from './components/ProjectMetadata'
import ProjectEditor from './components/ProjectEditor'
import { getProjectViewUrl } from 'utils/urlUtil'
import debounce from 'lodash/debounce'

import styles from './Project.styl'

// :username/:owner/:project/:mode
// fetchProject,
// codeChanged,
// saveFile,
// updateProjectDescription

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

  componentDidMount() {
    const { owner, username, project } = this.props.match.params

    fetch(`/api/${owner || username}/${project}`, {
      credentials: 'include',
    })
      .then(req => req.json(), err => console.error(err))
      .then(project => {
        this.setState({ project })
      })
  }

  onCodeChanged(newCode) {
    this.setState({
      project: Object.assign({}, this.state.project, { source: newCode }),
    })
  }

  onCancelChanges() {
    if (this.state.originalCode) this.onCodeChanged(this.state.originalCode)
  }

  onSaveChanges(open) {
    const { params, project, saveFile } = this.props

    saveFile(params, project).then(result => {
      if (open === true) {
        window.open(getProjectViewUrl(params))
      }
    })
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
