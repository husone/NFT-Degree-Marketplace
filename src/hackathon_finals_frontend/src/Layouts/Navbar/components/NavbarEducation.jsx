import { publicRoutes } from '../../../Routes/index'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../Navbar.scss'

function NavbarEducation() {
  const [pathRoles, setPathRoles] = useState([])

  useEffect(() => {
    const filterPath = publicRoutes.filter(route => route.role === 'education')
    setPathRoles(filterPath)
  }, [])
  return (
    <>
      {pathRoles.map((route, index) => {
        return (
          <Link
            key={index}
            className="navbar-brand custom_dropdown"
            to={route.path}
          >
            {route.desc}
          </Link>
        )
      })}
    </>
  )
}

export default NavbarEducation
