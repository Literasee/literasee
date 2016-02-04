import React, { Component } from 'react';
import AceEditor from 'react-ace';
import githubTheme from 'brace/theme/github';
import markdownSyntax from 'brace/mode/markdown';

import styles from './CodeEditor.styl';

export default ({ file, onCodeChange }) => {
  if (!file) return <div />

  return (
    <AceEditor
      mode='markdown'
      theme='github'
      name='aceEditor'
      value={file.content}
      className={styles.aceEditor}
      showPrintMargin={false}
      editorProps={{$blockScrolling: true}}
      onChange={onCodeChange}
    />
  )
}
