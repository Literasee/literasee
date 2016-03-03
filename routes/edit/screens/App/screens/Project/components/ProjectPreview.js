import React, { Component } from 'react';
import { getProjectViewUrl } from 'utils/urlUtil';
import marked from 'marked';
import katex from 'parse-katex';

import styles from './ProjectPreview.styl';

class ProjectPreview extends Component {

  constructor () {
    super();
    this.state = {type: 'report'};
  }

  // when presentations change slides we get a message from the iframe
  // and save the exact URL being displayed
  componentDidMount () {
    window.addEventListener('message', (e) => {
      this.currentHash = e.data;
    });
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.type !== 'keywords') {
      this.setState({type: nextProps.type})
    }

    if (nextProps.project.files) {
      const type = this.props.params.type;
      const ext = type === 'keywords' ? '.txt' : '.md';
      const file = _.find(nextProps.project.files, {filename: type + ext});
      this.setState({code: file.content});
    }
  }

  updatePreview (newCode) {
    this.setState({code: newCode});
  }

  getMarkup () {
    if (!this.state.code) return { __html: '' };
    let src = this.state.code;
    src = marked(src);
    src = katex.render(src);
    if (src.substr(0, 1) !== '<') src = '<' + src;
    src = '<div class="container">' + src + '</div>';
    return { __html: src };
  }

  refresh () {
    this._iframe.src = this.currentHash || this._iframe.src;
    // iframes don't refresh on hash changes so we have to explicitly reload
    document.getElementById('viewerFrame').contentWindow.postMessage('reload', '*');
  }

  render () {
    this.currentHash = null;

    if (!this.props.project.full_name && !this.props.project.id) return <div />;

    const viewUrl = getProjectViewUrl(this.props, this.state.type, '?embedded=true');

    const iframe = (
      <iframe
        id='viewerFrame'
        ref={(c) => this._iframe = c}
        src={viewUrl}>
      </iframe>
    )

    const livePreview = (
      <div id='live-preview'
        className='live-preview'
        dangerouslySetInnerHTML={::this.getMarkup()} />
    )

    const activePreview = this.props.params.type === 'report' ? livePreview : iframe;

    return (
      <div className={styles.container}>
        <div className={styles.livePreviewWrapper}>
          {activePreview}
        </div>
      </div>
    )
  }
}

export default ProjectPreview;
