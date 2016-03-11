import React from 'react';
import CodeEditor from './CodeEditor';

import styles from './FileEditor.styl';

const FileEditor = ({ code, onCodeChange, onCancel, onSave, children }) => {
  return (
    <div className={styles.container}>
      {children}
      <CodeEditor
        code={code}
        onCodeChange={onCodeChange}
        onSave={onSave} />
      <div className={styles.buttonContainer}>
        <button
          onClick={onCancel}
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
