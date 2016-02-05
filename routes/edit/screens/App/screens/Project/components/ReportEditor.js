import React from 'react';
import ReportOptionsPanel from './ReportOptionsPanel';
import CodeEditor from './CodeEditor';

import styles from './ReportEditor.styl';

const ReportEditor = ({ file, onCodeChange, onSave }) => {
  return (
    <div className={styles.container}>
      <ReportOptionsPanel />
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

export default ReportEditor;
