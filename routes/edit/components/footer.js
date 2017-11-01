import React from 'react'

export default () => {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        paddingLeft: '2rem',
      }}
    >
      <p className="dimmed" style={{ margin: '0.7rem 0' }}>
        &copy; {year} Literasee
      </p>
    </footer>
  )
}
