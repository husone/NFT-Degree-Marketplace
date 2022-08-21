import { publicRoutes } from '../../../Routes/index'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
function NavbarUser() {
  const [pathRoles, setPathRoles] = useState([])

  useEffect(() => {
    const filterPath = publicRoutes.filter(route => route.role === 'user')
    setPathRoles(filterPath)
  }, [])

  return (
    <>
      <div className="dropdown">
        <button
          className="btn dropdown-toggle custom_dropdown"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Create Request
        </button>
        <ul className="dropdown-menu">
          {pathRoles.map((route, index) => {
            if (route.dropdown) {
              return (
                <Link className="dropdown-item" to={route.path} key={index}>
                  {route.desc}
                </Link>
              )
            }
          })}
        </ul>
      </div>

      {pathRoles.map((route, index) => {
        if (!route.dropdown) {
          return (
            <Link key={index} className="navbar-brand" to={route.path}>
              {route.desc}
            </Link>
          )
        }
      })}
    </>
  )
}

export default NavbarUser
