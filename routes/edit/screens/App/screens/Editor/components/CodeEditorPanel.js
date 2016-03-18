import React from 'react'
import { Link } from 'react-router'

import CodeEditor from './CodeEditor'

export default ({files = [], params, onChange, onSave}) => {
  const path = '/' + params.username + '/' + params.gistId

  return (
    <div className='editor-edit'>
      <nav role='nav' className='editor-nav-horizontal cf'>
        <ul className='list-inline list-unstyled fl-left'>
          {files.map(file => {
            return (
              <li key={file.filename}>
                <Link activeClassName='editor-file-open'
                  to={path + '/' + file.href}>{file.filename}</Link>
              </li>
            )
          })}
        </ul>
        <div className='btn-group fl-right'>
          <button type='button' name='button' className='btn btn-small btn-outlined btn-icon fl-left'><span className='octicon octicon-chevron-left'></span></button>
          <button type='button' name='button' className='btn btn-small btn-outlined btn-icon fl-left'><span className='octicon octicon-chevron-right'></span></button>
        </div>
      </nav>
      <CodeEditor
        files={files}
        activeFilename={params.file}
        onChange={onChange}
        onSave={onSave} />
    </div>
  )
}
