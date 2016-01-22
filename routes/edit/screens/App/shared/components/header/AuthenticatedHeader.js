import React from 'react'

export default function ({username}) {
  return (
    <div className="row">
      <h3 className="col-xs-4 col-md-6 txt-left mb0 mt0"><a href="#">Literasee</a></h3>
      <nav role="navigation" className="col-xs-8 col-md-6">
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
