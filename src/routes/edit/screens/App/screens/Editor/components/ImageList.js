import React, { Component } from 'react'
import { Link } from 'react-router'
import Dropzone from 'react-dropzone'
import clipboard from 'clipboard-js'

import styles from './ImageList.styl'

export default class ImageList extends Component {

  constructor () {
    super()
    this.state = {
      files: []
    }
  }

  // when we detect an image has been added to the real list
  // we clear out our previews
  componentWillReceiveProps (nextProps) {
    if (nextProps.images.length > this.props.images.length) {
      this.setState({files: []})
    }
  }

  // when a file(s) is dropped in, we store them in state
  // so that we can render it immediately via the blob preview
  onDrop (files) {
    this.setState({files})
    this.props.onUploadFiles(files)
  }

  onImageClick (url) {
    clipboard.copy(`![](${url})`)
    window.editor.insert(`![](${url})`)
  }

  render () {
    let { images } = this.props

    images = [].concat(this.state.files.map(f => f.preview), images)

    return (
      <div className={styles.rootContainer}>
        <h4 className='fl-left mr-half'>Images</h4>

        <Dropzone onDrop={::this.onDrop} className={styles.dropZone}>
          <div>Drop files here, or click to select files to upload.</div>
        </Dropzone>

        <div className={styles.listContainer}>
          <ul className={styles.list}>

            {images.map((src, i) => {
              const thumb = src.split('upload').join('upload/w_220')
              return (
                <img key={i}
                  src={thumb}
                  onClick={() => this.onImageClick(src)} />
              )
            })}

          </ul>
        </div>
      </div>
    )
  }
}
