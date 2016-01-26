import React, { Component } from 'react'
import AceEditor from 'react-ace'
import * as jsMode from 'brace/mode/javascript'
import * as mdMode from 'brace/mode/markdown'
import * as cssMode from 'brace/mode/css'
import * as htmlMode from 'brace/mode/html'
import * as ghTheme from 'brace/theme/github'
import _ from 'lodash'

const modes = {
  js: 'javascript',
  md: 'markdown',
  css: 'css',
  html: 'html'
}

const options = {
  lineNumbers: false,
  autofocus: false,
  tabSize: 2,
  mode: 'javascript'
}

const onLoad = (editor, onSave) => {
  window.editor = editor
  editor.commands.addCommand({
    name: 'saveChanges',
    bindKey: {win: 'Ctrl-Enter',  mac: 'Ctrl-Enter|Command-Enter'},
    exec: function(editor) {
      onSave()
    }
  });
}

export default ({files, activeFilename, onChange, onSave}) => {
  const file = _.find(files, {href: activeFilename})

  if (!activeFilename || !file) return <span/>

  const mode = modes[file.filename.split('.').pop()]

  return (
    <AceEditor
      mode={mode}
      theme="github"
      name="aceEditor"
      value={file.content}
      width='100%'
      showPrintMargin={false}
      onLoad={(editor) => onLoad(editor, onSave)}
      onChange={onChange}
      editorProps={{$blockScrolling: true}}
    />
  )
}
