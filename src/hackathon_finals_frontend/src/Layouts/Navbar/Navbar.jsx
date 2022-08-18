import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/Images/logo.png'
import { checkRole } from '../../Utils/CheckRole'
import { ConnectButton, useConnect } from '@connect2ic/react'
import { publicRoutes } from '../../Routes/index'
import { withContext } from '../../hooks/index'
import NavbarEducation from './components/NavbarEducation'
import NavbarUser from './components/NavbarUser'

function NavBar(props) {
  console.log(props)
  const { role, logout, setRole } = props
  const [pathRoles, setPathRoles] = useState([])
  const [Component, setComponent] = useState(null)
  const { principal, isConnected, disconnect } = useConnect()

  useEffect(() => {
    // let role = checkRole(principal)
    // setRole(role)
    // const filterPath = publicRoutes.filter(route => route.role === role)
    // setPathRoles(filterPath)
  }, [])

  const onConnectWallet = async () => {
    try {
      console.log(principal)
      console.log('Connected to Plug')
    } catch (e) {
      console.log(e)
    }
  }

  const onDisconnect = () => {
    disconnect()
    logout()
    console.log('Disconnected from Plug')
  }

  // Change TEST_ID for test role, 1 for admin role, 3 for user role, 2 for education role
  // const TEST_ID = 4

  return (
    role && (
      <Nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <div className="d-flex">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="Home" />
            </Link>
            {role === 'user' && <NavbarUser />}
            {role === 'education' && <NavbarEducation />}
          </div>
          <div className="d-flex align-items-center h100">
            {principal && <div className="wallet_id">{principal}</div>}
            <ConnectButton
              onConnect={onConnectWallet}
              onDisconnect={onDisconnect}
            />
          </div>
        </div>
      </Nav>
    )
  )
}

export default withContext(NavBar)

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
    &:hover {
      border: 0px;
    }
  }
`
