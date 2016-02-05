import React from 'react';
import CodeEditor from './CodeEditor';

import styles from './FileEditor.styl';

const FileEditor = ({ file, onCodeChange, onSave, children }) => {
  return (
    <div className={styles.container}>
      {children}
      <CodeEditor
        file={file}
        onCodeChange={onCodeChange}
        onSave={onSave} />
      <div className={styles.buttonContainer}>
        <button
          type='button'
          name='button'
          className='btn btn-outlined'>
          Cancel
        </button>
        <button
          onClick={onSave}
          type='button'
          name='button'
          className='btn btn-primary'>
          Save
        </button>
      </div>
    </div>
  )
}

export default FileEditor;
