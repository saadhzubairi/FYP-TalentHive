

import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"


function Navbar() {
  return (
   <nav className='nav'>
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