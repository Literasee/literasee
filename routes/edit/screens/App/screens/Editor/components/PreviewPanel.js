import React from 'react'

export default ({username, gistId, previewType, setPreviewType, setViewType, ignoreMouse}) => {
  let classes = 'btn btn-small btn-outlined'
  let activeClasses = classes + ' btn-pressed'

  return (
    <div className='editor-preview'>
      <div className='cf editor-header'>
        <h4 className='mb0 fl-left'>Preview</h4>
        <div className='btn-group cf fl-right'>
          <button type='button'
            name='button'
            className={previewType !== '' ? classes : activeClasses}
            onClick={() => setPreviewType('')}>
            Markdown
          </button>
          <button type='button'
            name='button'
            className={previewType !== 'slides' ? classes : activeClasses}
            onClick={() => setPreviewType('slides')}>
            Slides
          </button>
          <button type='button'
            name='button'
            className={previewType !== 'tufte' ? classes : activeClasses}
            onClick={() => setPreviewType('tufte')}>
            Tufte
          </button>
        </div>
      </div>
      <div className='editor-preview-body'>
        <iframe id="viewerFrame"
                width="100%"
                style={{
                  height: '100%',
                  pointerEvents: ignoreMouse ? 'none' : 'inherit'
                }}
                src={`http://www.literasee.io/${username}/${gistId}/${previewType}`}>
        </iframe>
      </div>
    </div>
  )
}
