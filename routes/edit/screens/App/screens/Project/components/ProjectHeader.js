import React, { Component } from 'react';
import { Link } from 'react-router';
import { getProjectViewUrl } from 'utils/urlUtil';
import classnames from 'classnames';

import styles from './ProjectHeader.styl';

export default class ProjectHeader extends Component {
  constructor () {
    super();
    this.state = {
      showEditIcon: false,
      isEditing: false,
      newTitle: null,
      newSubTitle: null
    };
  }

  onKeyPress (event) {
    if (event.key === 'Enter') this.saveTitleEdits();
  }

  beginEditing () {
    this.setState({
      isEditing: true,
      showEditIcon: false
    });
  }

  saveTitleEdits () {
    this.props.onSaveTitles(this._title.value, this._subTitle.value);
    this.setState({
      isEditing: false,
      newTitle: this._title.value,
      newSubTitle: this._subTitle.value
    });
  }

  getEditingUI () {
    const { project } = this.props;

    const { title, subTitle } = this.getTitles(project);

    return (
      <div className={styles.formContainer}>
        <div className={styles.inputsContainer}>
          <input type='text'
            ref={(c) => this._title = c}
            onKeyPress={::this.onKeyPress}
            defaultValue={title} />
          <input type='text'
            ref={(c) => this._subTitle = c}
            onKeyPress={::this.onKeyPress}
            defaultValue={subTitle} />
        </div>
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
    );
  }

  getDisplayUI () {
    const { username, project } = this.props;
    const { isEditing, newTitle, newSubTitle } = this.state;

    const { title, subTitle } = this.getTitles(project);
    const titleClasses = classnames({
      [styles.titles]: true,
      [styles.noSubTitle]: !subTitle
    });

    const displayTitle = typeof newTitle === 'string' ? newTitle : title;
    const displaySubTitle = typeof newSubTitle === 'string' ? newSubTitle : subTitle;

    return (
      <div className={styles.labelsContainer}>
        <Link className='mega-octicon octicon-chevron-left mr1'
          title='Back to your projects'
          to={'/' + username}>
        </Link>
        <div className={titleClasses}
          onMouseOver={() => this.setState({showEditIcon: true})}
          onMouseOut={() => this.setState({showEditIcon: false})}>
          <h3 className='mb0 mr1'>{displayTitle}</h3>
          <div className={styles.description}>{displaySubTitle}</div>
          <button type='button'
            name='button'
            className='btn btn-icon btn-outlined'
            style={{
              display: this.state.showEditIcon ? 'block' : 'none'
            }}
            title='Edit title and description'
            onClick={::this.beginEditing}>
            <span className='octicon octicon-pencil'></span>
          </button>
        </div>
      </div>
    );
  }

  getTitles (project) {
    const { description } = project;
    const title = description ? description.split('|')[0].trim() : project.id;
    const subTitle = description ? description.split('|')[1] : '';

    return { title, subTitle };
  }

  render () {
    const { username, project, onClickPublish } = this.props;
    const { isEditing } = this.state;
    const viewUrl = getProjectViewUrl(this.props);
    const btnClasses = classnames({
      [styles.btnContainer]: true,
      [styles.hidden]: isEditing
    })

    const titleUI = this.state.isEditing ? this.getEditingUI() : this.getDisplayUI();

    return (
      <div className={styles.container}>
        {titleUI}

        <div className={btnClasses}>
          <a
            href={viewUrl}
            target='_blank'
            className={styles.headerBtn}>
            Open in Viewer
          </a>
          <button
            className={styles.headerBtn}
            onClick={onClickPublish}>
            Publish
          </button>
        </div>
      </div>
    )
  }
}
