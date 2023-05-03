

import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"

import "./sidebar.css"


function Navbar() {
  return (
   <nav className="sidebar">
    <div className="sidebarWrapper"> 

    <Link to='/' className='site-title'> HRMS Systems .LTD</Link>
    <ul >
        <li >
            <Link to='/'> Candidates </Link>
        </li>
        <li>
            <CustomLink to='HR_page'>HR users</CustomLink>
        </li>
        <li>
            <CustomLink to='CompanyPage'>company users</CustomLink>
        </li>
        <li>
            <CustomLink to='/'> Company List </CustomLink>
        </li>
    </ul>
    </div>
   </nav>
  )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }

export default Navbar;