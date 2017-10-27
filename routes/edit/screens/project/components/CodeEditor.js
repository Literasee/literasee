import React, { Component } from 'react'
import AceEditor from 'react-ace'
import githubTheme from 'brace/theme/github'
import markdownSyntax from 'brace/mode/markdown'

import styles from './CodeEditor.styl'

export default ({ code, onEditorInit, onCodeChange, onSave, style }) => {
  const onLoad = editor => {
    editor.commands.addCommand({
      name: 'saveChanges',
      bindKey: {
        win: 'Ctrl-Enter|Ctrl-S',
        mac: 'Ctrl-Enter|Command-Enter|Command-S',
      },
      exec: onSave,
    })
  }

  return (
    <div className={styles.container} style={style}>
      <AceEditor
        mode="markdown"
        theme="github"
        name="aceEditor"
        ref={onEditorInit}
        value={code}
        className={styles.aceEditor}
        showPrintMargin={false}
        showGutter={false}
        editorProps={{ $blockScrolling: Infinity }}
        setOptions={{
          showLineNumbers: false,
        }}
        onLoad={onLoad}
        onChange={onCodeChange}
      />
    </div>
  )
}
