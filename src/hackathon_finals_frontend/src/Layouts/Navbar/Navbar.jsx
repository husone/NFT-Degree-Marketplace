import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from "../../Assets/Images/logo.png"
import { checkRole } from '../../Utils/CheckRole'
import { ConnectButton, useConnect } from '@connect2ic/react'
import { publicRoutes } from '../../Routes/index'
import { Context } from '../../hooks/index'

export default function NavBar() {
  const [role, setRole] = useContext(Context)
  const [pathRoles, setPathRoles] = useState([])

  const { principal } = useConnect({
    onConnect: () => {
      // Signed in
      console.log('Connected to Plug')
    },
    onDisconnect: () => {
      console.log('Disconnected from Plug')
      // Signed out
    },
  })

  // Change TEST_ID for test role, 1 for admin role, 3 for user role, 2 for education role
  // const TEST_ID = 4
  useEffect(() => {
    let role = checkRole(principal)
    setRole(role)
    console.log(role)
    const filterPath = publicRoutes.filter(route => route.role === role)
    setPathRoles(filterPath)
  }, [principal])

  return (
    <Nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div className="d-flex">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Home" />
          </Link>
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
          {role === 'user' && (
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
    height: 35px;
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
  .custom_dropdown {
    border: 0px;
    font-size: 1.25rem;
    &:hover{
      border: 0px;
    }
  }
`
