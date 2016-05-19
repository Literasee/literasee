import React, { Component } from 'react';
import { getProjectViewUrl } from 'utils/urlUtil';
import marked from 'marked';
import katex from 'parse-katex';

import styles from './ProjectPreview.styl';

class ProjectPreview extends Component {

  // when presentations change slides we get a message from the iframe
  // and save the exact URL being displayed
  componentDidMount () {
    window.addEventListener('message', (e) => {
      this.currentHash = e.data;
    });
  }

  getMarkup (code) {
    if (!code) return { __html: '' };

    let src = code;
    src = marked(src);
    src = katex.render(src);
    if (src.length && src.substr(0, 1) !== '<') src = '<' + src;
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

    const { project, params } = this.props;
    const { type } = params;

    if (!project) return <div />;

    const viewUrl = getProjectViewUrl(params, type);

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
        dangerouslySetInnerHTML={::this.getMarkup(project[type])} />
    )

    const activePreview = type === 'report' ? livePreview : iframe;

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
