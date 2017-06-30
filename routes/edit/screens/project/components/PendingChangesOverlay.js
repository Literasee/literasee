import React from 'react'

export default ({ isVisible }) =>
  <div
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      opacity: isVisible ? 0.9 : 0,
      backgroundColor: 'white',
      transition: isVisible ? 'opacity 0.25s' : 'opacity 0.35s linear 0.25s',
      pointerEvents: 'none',
    }}
  >
    <img
      src="/public/img/ripple.svg"
      style={{
        width: '72px',
        mixBlendMode: 'exclusion',
        opacity: 0.6,
      }}
    />
  </div>
