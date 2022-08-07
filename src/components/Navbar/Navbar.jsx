import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
  <div className="container">
    <a className="navbar-brand" href="#">Notes</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Register
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="signup">SignUp</Link></li>
            <li><Link className="dropdown-item" to="signin">Signin</Link></li>
            
          </ul>
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>


    </>
  )
}
