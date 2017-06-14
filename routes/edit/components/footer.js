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
      <p className="dimmed mt1">&copy; {year} Literasee</p>
    </footer>
  )
}
