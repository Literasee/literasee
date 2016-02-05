import React, { Component } from 'react';
import AceEditor from 'react-ace';
import githubTheme from 'brace/theme/github';
import markdownSyntax from 'brace/mode/markdown';

import styles from './CodeEditor.styl';

export default ({ file, onCodeChange, onSave }) => {
  if (!file) return <div />;

  const onLoad = (editor) => {
    editor.commands.addCommand({
      name: 'saveChanges',
      bindKey: {win: 'Ctrl-Enter',  mac: 'Ctrl-Enter|Command-Enter'},
      exec: onSave
    });
  }

  return (
    <AceEditor
      mode='markdown'
      theme='github'
      name='aceEditor'
      value={file.content}
      className={styles.aceEditor}
      showPrintMargin={false}
      editorProps={{$blockScrolling: Infinity}}
      onLoad={onLoad}
      onChange={onCodeChange}
    />
  )
}
