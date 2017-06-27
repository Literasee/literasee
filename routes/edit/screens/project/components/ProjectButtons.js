import React, { Component } from 'react'

import styles from './ProjectButtons.styl'

export default class extends Component {
  constructor() {
    super()
    this.state = { isSaving: false }
  }

  render() {
    const { isSaving } = this.state
    const { onCancelChanges, onSaveChanges, changesExist } = this.props

    return (
      <div className={styles.container}>
        <button
          onClick={onCancelChanges}
          type="button"
          name="button"
          disabled={isSaving || !changesExist}
          className="btn"
        >
          Cancel
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            this.setState({ isSaving: true })
            onSaveChanges().then(() => {
              this.setState({ isSaving: false })
            })
          }}
          type="button"
          name="button"
          disabled={isSaving}
          className="btn btn-primary"
        >
          Save
          <img
            src="/public/img/ripple.svg"
            style={{
              marginLeft: '0.7rem',
              marginRight: '-0.6rem',
              width: isSaving ? '18px' : 0,
            }}
          />
        </button>
      </div>
    )
  }
}
