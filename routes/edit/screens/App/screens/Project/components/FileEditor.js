import React from 'react';
import CodeEditor from './CodeEditor';

import styles from './FileEditor.styl';

const FileEditor = ({ code, onCodeChanged, onCancel, onSave, children }) => {
  return (
    <div className={styles.container}>
      {children}
      <CodeEditor
        code={code}
        onCodeChange={onCodeChanged}
        onSave={onSave} />
    </div>
  )
}

export default FileEditor;
