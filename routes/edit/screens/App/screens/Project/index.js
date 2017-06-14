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
    // don't react to every keystroke
    this.onCodeChanged = debounce(this.onCodeChanged, 250)
  }

  componentWillReceiveProps(nextProps) {
    const { project, params } = this.props

    if (this.state && !this.state.originalCode) {
      this.setState({ originalCode: project.source })
    }

    // if (nextProps.path !== this.props.path) {
    //   this.setState({originalCode: project[nextProps.params.type]});
    // }
  }

  onSaveTitles(title, subTitle) {
    const { params, project, updateProjectDescription } = this.props
    updateProjectDescription(params, project, title, subTitle)
  }

  onCodeChanged(newCode) {
    this.props.codeChanged(newCode || ' ')
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
    const { project, params } = this.props

    return (
      <div className={styles.container}>
        <ProjectMetadata save={::this.saveKeywords} {...this.props} />
        <ProjectEditor
          params={params}
          project={project}
          onCodeChanged={::this.onCodeChanged}
          onCancelChanges={::this.onCancelChanges}
          onSaveChanges={::this.onSaveChanges}
        />
      </div>
    )
  }
}

export default Project
