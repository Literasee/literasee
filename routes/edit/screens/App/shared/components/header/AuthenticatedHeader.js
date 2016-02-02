import React from 'react'
import Logo from './Logo';

export default function ({ username }) {
  return (
    <div className="row">
      <h3 className="col-xs-4 col-md-6 txt-left mb0 mt0">
        <a href="/"><Logo scale="0.6" /></a>
      </h3>
      <nav
        role="navigation"
        className="col-xs-8 col-md-6"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
        <ul className="list-inline list-unstyled cf fl-right">
          <li>Welcome <a href="#">{username}</a></li>
          <li>
            <a role="button"
              className="btn btn-outlined btn-small"
              href="/logout">
              Log out
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
