import React from 'react'
import {NavLink} from "react-router-dom"

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll shadow-0" style={{"background-color": "#ffede7"}}>
  <div className="container">
    <NavLink className="navbar-brand" to="#">iNotebook</NavLink>
    <button className="navbar-toggler ps-0" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
      aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="d-flex justify-content-start align-items-center">
        <i className="fas fa-bars"></i>
      </span>
    </button>
    <div className="collapse navbar-collapse" id="navbarExample01">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item active">
          <NavLink className="nav-link px-3" to="#!">shop online</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-3" to="#!">new collection</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-3" to="#!">about us</NavLink>
        </li>
        <li className="nav-item active">
          <NavLink className="nav-link px-3" to="#!">collaboration</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-3" to="#!">contact us</NavLink>
        </li>
      </ul>

      <ul className="navbar-nav flex-row">
        <li className="nav-item">
          <NavLink className="nav-link pe-3" to="#!">
            <i className="fab fa-youtube"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link px-3" to="#!">
            <i className="fab fa-facebook-f"></i>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link ps-3" to="#!">
            <i className="fab fa-instagram"></i>
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
      )
}
