import React from 'react';
import CodeEditor from './CodeEditor';

import styles from './FileEditor.styl';

const FileEditor = ({ code, onCodeChanged, onCancel, onSave, children, mode }) => {
  return (
    <div
      className={styles.container}
      style={{
        flex: mode === 'edit' ? 1 : 0
      }}
    >
      {children}
      <CodeEditor
        code={code}
        onCodeChange={onCodeChanged}
        onSave={onSave} />
    </div>
  )
}

export default FileEditor;
