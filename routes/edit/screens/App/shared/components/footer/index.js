import React, { Component } from 'react';

export default function () {
  const year = new Date().getFullYear();

  return (
    <footer role='contentinfo' className='container-fluid'>
      <p className='dimmed mt1'>&copy; {year} Literasee</p>
    </footer>
  )
}
