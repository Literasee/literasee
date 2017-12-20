import React from 'react'
import classNames from 'classnames'

export default ({
  bgImage,
  contentClasses,
  margin = '1/6',
  rect = {},
  vh,
  offset,
  children,
}) => {
  const bgClasses = classNames('screen_bg', {
    screen_bg__active: rect.isFullScreen,
  })

  const imgClasses = classNames('screen_bg_image', {
    screen_bg_image__above: rect.bottom - offset < vh,
    screen_bg_image__below: rect.top - offset > 0,
  })

  return (
    <div className="screen">
      <div className={bgClasses}>
        <div
          className={imgClasses}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </div>
      <div className={`w-${margin}`} />
      <div
        className={`screen_content${
          contentClasses ? ' ' + contentClasses : ''
        }`}
      >
        {children}
      </div>
    </div>
  )
}
