import React, { Component } from 'react'
import AceEditor from 'react-ace'
import githubTheme from 'brace/theme/github'
import markdownSyntax from 'brace/mode/markdown'

import styles from './CodeEditor.styl'

export default ({ code, isActive, onCodeChange, onSave }) => {
  if (!code) return <div />

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
    <div className={styles.container} style={{ flex: isActive ? 1 : 0 }}>
      <AceEditor
        mode="markdown"
        theme="github"
        name="aceEditor"
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
