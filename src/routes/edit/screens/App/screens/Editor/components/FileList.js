import React from 'react'
import { Link } from 'react-router'

export default ({files, params}) => {
  if (!files) return <div></div>

  const path = '/' + params.username + '/' + params.gistId

  return (
    <ul className='list-unstyled'>

      {files.map(file => {
        const className = file.href === params.file ? 'editor-file-active' : ''
        let status
        let link

        if (file.isEdited) {
          status = <span className='editor-file-state file-edited'></span>
        }
        if (file.isNew) {
          status = <span className='editor-file-state file-new'></span>
        }
        if (file.type.substr(0, 4) === 'text') {
          link = <Link to={path + '/' + file.href}>{file.filename}</Link>
        } else {
          link = file.filename
        }

        return (
          <li key={file.filename} className={className}>
            {status}
            {link}
          </li>
        )
      })}
    </ul>
  )
}
