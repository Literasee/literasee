import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProjectGrid extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    fetch(`/api/${this.props.username || 'featured'}`, {
      credentials: 'include',
    })
      .then(req => req.json(), err => console.error(err))
      .then(projects => {
        this.setState({ projects })
      })
  }

  render() {
    const { projects = [] } = this.state
    const { username } = this.props

    return (
      <div className="center-lg container-fluid">
        <div className="col-xs-12">
          <div className="row around-xs mt2">

            {projects.map(project => {
              const image = project.thumbnail || '/public/img/thumb.svg'

              let [title, subTitle] = (project.description || '').split('|')
              if (!title) title = project.name
              let linkDest = `/${project.owner}/${project.name}/edit`
              if (username && username !== project.owner) {
                linkDest = `/${username}${linkDest}`
              }

              return (
                <div key={linkDest} className="col-xs-12 col-md-4 col-lg-4">
                  <Link
                    className="panel txt-left panel-project scales"
                    style={{ backgroundImage: `url("${image}")` }}
                    to={linkDest}
                  >
                    <h4 className="mb0">{title}</h4>
                    <p>{subTitle}</p>
                  </Link>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    )
  }
}

export default ProjectGrid
