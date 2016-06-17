import React, { Component } from 'react';
import ProjectGrid from 'components/ProjectGrid';

class User extends Component {
  render () {
    const { projects = [], user, params, onCreateProject } = this.props;

    return (
      <ProjectGrid
        projects={projects.filter(p => !p.isIgnored)}
        user={user}
        username={params.username}
        createGist={onCreateProject} />
    )
  }
}

export default User;
