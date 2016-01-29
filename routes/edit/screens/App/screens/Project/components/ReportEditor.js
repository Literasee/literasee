import React from 'react';
import ReportOptionsPanel from './ReportOptionsPanel';
import CodeEditor from './CodeEditor';

import styles from './ReportEditor.styl';

const ReportEditor = ({ file }) => {
  return (
    <div className={styles.container}>
      <ReportOptionsPanel />
      <CodeEditor file={file} />
    </div>
  )
}

export default ReportEditor;
