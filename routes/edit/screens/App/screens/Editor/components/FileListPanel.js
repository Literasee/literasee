import React, { Component } from 'react'
import classnames from 'classnames'

import FileList from './FileList'
import ImageList from './ImageList'

class AddFileForm extends Component {
  render () {
    return (
      <div>
        <input ref='newFile' type='text' />
        <button type='button'
          className='btn btn-icon btn-primary'
          title='Create file'
          onClick={() => {
            this.props.onAddFile(this.refs.newFile.value)
          }}>
          Add
        </button>
      </div>
    )
  }
}

export default class FileListPanel extends Component {
  constructor () {
    super()
    this.state = {
      addFileForm: false
    }
  }

  toggleAddForm () {
    this.setState({
      showAddForm: !this.state.showAddForm
    })
  }

  render () {
    const {showAddForm} = this.state
    const {
      files,
      params,
      images,
      onAddFile,
      onUploadFiles,
      isCollapsed,
      onToggleFilePanelCollapsed
    } = this.props
    const panelClasses = classnames('editor-files', {collapsed: isCollapsed})
    const collapseClasses = classnames('octicon', {
      'octicon-fold': !isCollapsed,
      'octicon-unfold': isCollapsed
    })
    const addFileForm = <AddFileForm
      username={params.username}
      onAddFile={onAddFile} />
    const fileForm = showAddForm ? addFileForm : null

    return (
      <div className={panelClasses}>
        <div className='cf editor-header'>
          <h4 className='fl-left mr-half collapse'>Files</h4>
          <button type='button'
            name='button'
            className='btn btn-icon btn-primary fl-left collapse'
            title='New file'
            onClick={::this.toggleAddForm}>
            <span className='octicon octicon-plus'></span>
          </button>
          <button type='button'
            name='button'
            className='btn btn-icon btn-outlined fl-right'
            title='Collapse pane'
            onClick={onToggleFilePanelCollapsed}>
            <span className={collapseClasses}></span>
          </button>
        </div>

        <div className='collapse editor-files-content'>
          {fileForm}
          <FileList files={files} params={params} />
          <ImageList images={images} onUploadFiles={onUploadFiles} />
        </div>
      </div>
    )
  }
}
