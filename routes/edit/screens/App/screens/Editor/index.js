import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import SplitPane from 'react-split-pane'

import {
  fetchGistDetails,
  addFile,
  uploadFiles,
  getUserImages,
  saveFile,
  saveGistDescription,
  setPreviewType
} from '../../../../actions'

import EditorHeader from './components/EditorHeader'
import FileListPanel from './components/FileListPanel'
import CodeEditorPanel from './components/CodeEditorPanel'
import PreviewPanel from './components/PreviewPanel'

class Editor extends Component {
  constructor () {
    super()
    this.state = {
      isFilePanelCollapsed: localStorage.getItem('isFilePanelCollapsed') === 'true'
    }
  }

  componentDidMount () {
    const { token, params, fetchGistDetails, getUserImages, username } = this.props

    fetchGistDetails(token, params.gistId)
    getUserImages(username)
  }

  onAddFile (filename) {
    const { token, params, addFile, fetchGistDetails } = this.props

    addFile(filename)
    this.onSaveChanges()
      .then(() => fetchGistDetails(token, params.gistId))
  }

  onUploadFiles (files) {
    const { token, username, uploadFiles, getUserImages } = this.props

    return uploadFiles(token, username, files)
      .then(() => {
        return getUserImages(username)
      })
  }

  onEditorChange (newContent) {
    const { gist, params } = this.props
    const file = _.find(gist.files, {href: params.file})
    file.content = newContent
  }

  saveTitleEdits (title, description) {
    const { gist, saveGistDescription, fetchGistDetails, params } = this.props
    saveGistDescription(gist.id, title + ' | ' + description)
      .then(() => {
        fetchGistDetails(params.gistId)
      })
  }

  onSaveChanges () {
    const { token, gist, saveFile } = this.props
    const files = {}

    gist.files.forEach(file => {
      files[file.filename] = file
    })

    return saveFile(token, gist.id, files)
      .then(() => {
        document.getElementById('viewerFrame').src = document.getElementById('viewerFrame').src;
      });
  }

  onToggleFilePanelCollapsed () {
    localStorage.setItem('isFilePanelCollapsed', !this.state.isFilePanelCollapsed)
    this.setState({
      isFilePanelCollapsed: !this.state.isFilePanelCollapsed
    })
  }

  onSplitPaneChanged (size) {
    this.setState({isResizing: true})
    clearInterval(this.splitPaneInterval)
    this.splitPaneInterval = setTimeout(() => {
      this.setState({isResizing: false})
      localStorage.setItem('splitPos', size)
    }, 250)
  }

  render () {
    const { token, username, gist, params, previewType, setPreviewType, images } = this.props
    const { isFilePanelCollapsed } = this.state
    const openFiles = _.compact(this.props.openFiles.map((file) => {
      return _.find(gist.files, {href: file})
    }))

    let title = gist.id
    let description = ''

    if (gist.description) {
      let bits = gist.description.split(' | ')
      title = bits[0]
      description = bits[1]
    }

    return (
      <div className='mt1 editor-screen'>
        <EditorHeader
          username={params.username}
          gistId={gist.id}
          title={title}
          description={description}
          previewType={previewType}
          onTitleSaved={::this.saveTitleEdits}
          onClickSave={::this.onSaveChanges} />

        <div className='editor-container mt1 mb1'>
          <FileListPanel
            files={gist.files}
            params={params}
            images={images}
            isCollapsed={isFilePanelCollapsed}
            onToggleFilePanelCollapsed={::this.onToggleFilePanelCollapsed}
            onAddFile={::this.onAddFile}
            onUploadFiles={::this.onUploadFiles} />
          <div style={{
            flex: 1,
            position: 'relative'
          }}>
            <SplitPane
              split='vertical'
              defaultSize={localStorage.getItem('splitPos')}
              onChange={::this.onSplitPaneChanged}>
              <CodeEditorPanel
                files={openFiles}
                params={params}
                onChange={::this.onEditorChange}
                onSave={::this.onSaveChanges} />
              <PreviewPanel
                username={username}
                gistId={params.gistId}
                ignoreMouse={this.state.isResizing}
                previewType={previewType}
                setPreviewType={this.props.setPreviewType} />
            </SplitPane>
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
    gist: state.gist,
    openFiles: state.openFiles,
    previewType: state.previewType,
    images: state.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchGistDetails,
    addFile,
    uploadFiles,
    getUserImages,
    saveFile,
    saveGistDescription,
    setPreviewType
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
