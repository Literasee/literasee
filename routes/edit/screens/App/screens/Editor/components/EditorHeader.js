import React, { Component } from 'react'
import { Link } from 'react-router'

export default class EditorHeader extends Component {
  constructor () {
    super()
    this.state = {
      showEditIcon: false,
      isEditing: false
    }
  }

  onKeyPress (event) {
    if (event.key === 'Enter') this.saveTitleEdits()
  }

  saveTitleEdits () {
    this.props.onTitleSaved(this.refs.title.value, this.refs.description.value)
    this.setState({
      isEditing: false,
      newTitle: this.refs.title.value,
      newDescription: this.refs.description.value
    })
  }

  render () {
    const { username, gistId, title, description, previewType, onClickSave } = this.props
    const { isEditing, newTitle, newDescription } = this.state
    let titleUI

    if (isEditing) {
      titleUI = (
        <div className='col-xs-9 cf editor-title'>
          <Link className='mega-octicon octicon-chevron-left mr1'
            title='Back to your projects'
            to={'/' + username}>
          </Link>
          <input type='text'
            ref='title'
            onKeyPress={::this.onKeyPress}
            defaultValue={title} />
          <input type='text'
            ref='description'
            onKeyPress={::this.onKeyPress}
            defaultValue={description} />
          <div className='btn-container'>
            <button onClick={::this.saveTitleEdits}
              type='button'
              name='button'
              className='btn btn-primary'>Save</button>
            <button onClick={() => this.setState({isEditing: false})}
              type='button'
              name='button'
              className='btn btn-outlined'>Cancel</button>
          </div>
        </div>
      )
    } else {
      titleUI = (
        <div className='col-xs-9 cf editor-title'
          onMouseOver={() => this.setState({showEditIcon: true})}
          onMouseOut={() => this.setState({showEditIcon: false})}>
          <Link className='mega-octicon octicon-chevron-left mr1'
            title='Back to your projects'
            to={'/' + username}>
          </Link>
          <h3 className='mb0'>{newTitle || title}</h3>
          <div className='description'>{newDescription || description}</div>
          <button type='button'
            name='button'
            className='btn btn-icon btn-outlined fl-right'
            style={{
              margin: '0.2em -10px',
              display: this.state.showEditIcon ? 'block' : 'none'
            }}
            title='Edit title and description'
            onClick={() => this.setState({isEditing: !isEditing})}>
            <span className='octicon octicon-pencil'></span>
          </button>
        </div>
      )
    }

    return (
      <div className='row middle-xs start-xs'>
        {titleUI}
        <div className='col-xs-3 txt-right btn-container'>
          <button onClick={onClickSave} type='button' name='button' className='btn btn-primary'>Save</button>
          <a href={`http://literasee.io/${username}/${gistId}/${previewType}`} target='_blank' role='button' name='button' className='btn btn-outlined'>View</a>
        </div>
      </div>
    )
  }
}
