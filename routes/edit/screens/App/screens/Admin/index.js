import React, { Component } from 'react';
import ProjectAdminTile from './components/ProjectAdminTile';

class Admin extends Component {
  render () {
    const { projects } = this.props;

    return (
      <div className='row center-lg'>
        <div className='col-xs-12'>
          <div className='cf'>
            <h2 className='mt2 txt-left fl-left'>Your Projects</h2>
            <button
              type='button'
              name='button'
              className='btn btn-primary fl-right mt2'>
              Save Changes
            </button>
          </div>

          <div className='row'>
            {
              projects
                .filter(p => p.name || (p.files['report.md'] || p.files['presentation.md']))
                .map(ProjectAdminTile)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Admin;
