import * as React from 'react'

export interface NavBarProps {
  user: UserData
}

const NavBar = ({ user }: NavBarProps) => {
  const navRight = user
    ? (
        <li className="nav-item">
          <a className="nav-link" href="/auth/logout">Logout</a>
        </li>
      )
    : (
        <li className="nav-item">
          <a className="nav-link" href="/auth/login">Login</a>
        </li>
      )

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <a className="navbar-brand" href="#">Routinely</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">{navRight}</ul>
      </div>
    </nav>
  )
}

export default NavBar