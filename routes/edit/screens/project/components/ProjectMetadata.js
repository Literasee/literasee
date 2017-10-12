import React from 'react'
import { Link } from 'react-router-dom'

import Keywords from './Keywords'
import styles from './ProjectMetadata.styl'

const getTitles = project => {
  const { description, homepage } = project
  const title = description ? description.split('|')[0].trim() : project.name
  let subTitle = description ? description.split('|')[1] : ''

  return { title, subTitle }
}

export default props => {
  const { project } = props
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
        <Link to={'/' + props.match.params.username} className={styles.backBtn}>
          <img src="/public/img/icon-back.png" /> Back
        </Link>
        <h1>{title}</h1>
        <p>{subTitle}</p>
        {project.homepage && (
          <a href={project.homepage.replace(/ /g, '-')}>Published Site</a>
        )}
      </div>
      <Keywords
        keywords={project.keywords}
        add={addKeyword}
        remove={removeKeyword}
      />
    </div>
  )
}
