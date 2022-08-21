import { publicRoutes } from '../../../Routes/index'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function NavbarAdmin() {
  const [pathRoles, setPathRoles] = useState([])

  useEffect(() => {
    const filterPath = publicRoutes.filter(route => route.role === 'admin')
    setPathRoles(filterPath)
  }, [])
  return (
    <>
      {pathRoles.map((route, index) => {
        return (
          <Link key={index} className="navbar-brand" to={route.path}>
            {route.desc}
          </Link>
        )
      })}
    </>
  )
}

export default NavbarAdmin
