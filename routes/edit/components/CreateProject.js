import React, { Component } from 'react'

class CreateProject extends Component {
  constructor() {
    super()
    this.state = {}

    this.onNameChange = this.onNameChange.bind(this)
    this.onClickCancel = this.onClickCancel.bind(this)
    this.onClickCreate = this.onClickCreate.bind(this)
  }

  onNameChange(event) {
    this.setState({ repoName: event.target.value })
  }

  onClickCancel() {
    this.setState({ repoName: '', isOpen: false })
  }

  onClickCreate() {
    const { isOpen, repoName } = this.state

    if (isOpen) {
      this.props.onConfirmCreate(repoName)
      this.onClickCancel()
    } else {
      this.setState({ isOpen: true })
    }
  }

  render() {
    const { isOpen } = this.state
    const { onConfirmCreate } = this.props

    return (
      <div>
        {isOpen &&
          <span>
            <input
              type="text"
              placeholder="Repository Name"
              onChange={this.onNameChange}
              style={{ width: '13rem' }}
            />
            <button
              type="button"
              name="button"
              className="btn btn-small"
              onClick={this.onClickCancel}
              style={{
                marginLeft: '0.4rem',
                marginRight: '0.2rem',
              }}
            >
              Cancel
            </button>
          </span>}
        <button
          type="button"
          name="button"
          className={`btn btn-primary ${isOpen && 'btn-small'}`}
          onClick={this.onClickCreate}
        >
          {isOpen ? 'Create' : 'Create a Project'}
        </button>
      </div>
    )
  }
}

export default CreateProject
