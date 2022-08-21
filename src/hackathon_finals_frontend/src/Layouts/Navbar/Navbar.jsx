import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../../../assets/logo_colored.png'
import { checkRole } from '../../Utils/CheckRole'
import { ConnectButton, useConnect } from '@connect2ic/react'
import { publicRoutes } from '../../Routes/index'

export default function NavBar() {
  const { principal } = useConnect({
    onConnect: () => {
      // Signed in
      console.log('Signed in')
    },
    onDisconnect: () => {
      console.log('Signed out')
      // Signed out
    },
  })
  const [role, setRole] = useState(null)
  const [pathRoles, setPathRoles] = useState([])
  // Change TEST_ID for test role, 1 for admin role, 3 for user role, 2 for education role
  const TEST_ID = 4
  useEffect(() => {
    let role = checkRole(TEST_ID)
    setRole(role)
    const filterPath = publicRoutes.filter(route => route.role === role)
    setPathRoles(filterPath)
  }, [])

  return (
    <Nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="d-flex">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          {role === 'user' && (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Create Request
              </button>
              <ul className="dropdown-menu">
                {publicRoutes.map((route, index) => {
                  if (route.dropdown) {
                    return (
                      <Link
                        className="dropdown-item"
                        to={route.path}
                        key={index}
                      >
                        {route.desc}
                      </Link>
                    )
                  }
                })}
              </ul>
            </div>
          )}
          {pathRoles.map((route, index) => {
            const role = route.role
            if (role === 'user') {
              if (!route.dropdown) {
                return (
                  <Link key={index} className="navbar-brand" to={route.path}>
                    {route.desc}
                  </Link>
                )
              }
            } else {
              return (
                <Link key={index} className="navbar-brand" to={route.path}>
                  {route.desc}
                </Link>
              )
            }
          })}
        </div>
        <div className="d-flex align-items-center h100">
          {principal && <div className="wallet_id">{principal}</div>}
          <ConnectButton />
        </div>
      </div>
    </Nav>
  )
}

const Nav = styled.nav`
  height: 60px;
  border-bottom: 1px solid #ccc;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .connect-button {
    background-image: linear-gradient(45deg, #ff00aa, #3f35ff);
    color: #fff;
    border-radius: 10px;
    border: 0px;
    padding: 5px 15px;
  }
  .wallet_id {
    width: 100px;
    height: 35px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 3px solid #000;
    border-radius: 30px;
    padding: 0px 10px;
    margin-right: 15px;
  }
`
