import React from 'react';
import ReportOptionsPanel from './ReportOptionsPanel';
import CodeEditor from './CodeEditor';

import styles from './ReportEditor.styl';

const ReportEditor = ({ file }) => {
  return (
    <div className={styles.container}>
      <ReportOptionsPanel />
      <CodeEditor file={file} />
      <div className={styles.buttonContainer}>
        <button
          type='button'
          name='button'
          className='btn btn-outlined'>
          Cancel
        </button>
        <button
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
