import React from 'react'
import { Link } from 'react-router'

import Keywords from './Keywords'
import styles from './ProjectMetadata.styl'

const getTitles = project => {
  const { description } = project
  const title = description ? description.split('|')[0].trim() : project.id
  const subTitle = description ? description.split('|')[1] : ''

  return { title, subTitle }
}

const ProjectMetadata = props => {
  const { project, params } = props
  const { title, subTitle } = getTitles(project)

  const addKeyword = (event, input) => {
    if (event.key === 'Enter') {
      project.keywords = project.keywords || []

      if (project.keywords.indexOf(input.value.toLowerCase()) < 0) {
        project.keywords.push(input.value.toLowerCase())
        props.save()
      }
      input.value = ''
    }
  }

  const removeKeyword = keyword => {
    const list = project.keywords

    project.keywords = [
      ...list.slice(0, list.indexOf(keyword)),
      ...list.slice(list.indexOf(keyword) + 1),
    ]
    props.save()
  }

  return (
    <div className={styles.container}>
      <div>
        <Link to={'/' + params.username} className={styles.backBtn}>
          <img src="/public/img/icon-back.png" /> Back
        </Link>
        <h1>{title}</h1>
        <p>{subTitle}</p>
      </div>
      <Keywords
        keywords={project.keywords}
        add={addKeyword}
        remove={removeKeyword}
      />
    </div>
  )
}

export default ProjectMetadata
