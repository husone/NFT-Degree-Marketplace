import { useState, useEffect, useContext, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/Images/logo.png'
import { ConnectButton, useConnect } from '@connect2ic/react'
import { withContext } from '../../hooks/index'
import NavbarEducation from './components/NavbarEducation'
import NavbarUser from './components/NavbarUser'
import NavbarAdmin from './components/NavbarAdmin'
import { useNavigate } from 'react-router-dom'

import './Navbar.scss'

function NavBar(props) {
  const navigate = useNavigate()
  const { role, logout, setRole, login, balanceDIP20 } = props
  const { principal, isConnected, disconnect } = useConnect()

  useEffect(() => {
  }, [role])

  const onConnectWallet = async () => {
    login()
  }

  const onDisconnect = () => {
    disconnect()
    logout()
    console.log('Disconnected from Plug')
  }

  return (
    role && (
      <Nav className="navbar navbar-expand-lg ">
        <div className="container-fluid px-5">
          <div className="d-flex gap-4">
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="Home" />
            </Link>
            {role === 'user' && <NavbarUser />}
            {role === 'education' && <NavbarEducation />}
            {role === 'admin' && <NavbarAdmin />}
          </div>
          <div className="d-flex align-items-center h100">
            {balanceDIP20 && <div className="mx-3">{balanceDIP20}</div>}
            {principal && <div className="wallet_id mx-3">{principal}</div>}
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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background: #06060e;
  position: sticky;
  top: 0px;
  z-index: 100;
  img {
    height: 30px;
  }
  .connect-button {
    color: #fff;
    border-radius: 100px;
    border: 0px;
    padding: 0.5rem 1rem 0.5rem 1rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ff00aa, #3f35ff);
    background-size: 200% 100%;
    background-position: 100% 0;
    transition: background-position 0.5s;
    box-shadow: 0 4px 14px 0 var(--nextui-colors-successShadow);
    &:hover {
      background-position: right center;
      background-position: 0 0;
    }
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
    font-size: 16px;
    font-weight: 500;
  }
  .dropdown-menu {
    width: 120%;
  }
  .dropdown-item {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    min-width: 5rem;
    &:hover {
      background-image: linear-gradient(45deg, #ff00aa, #3f35ff);
      background-clip: text;
      -webkit-text-fill-color: #fff;
    }
  }
  .dropdown-toggle::after {
    border: none;
    margin-left: 1rem;
  }
  .navbar-brand {
    font-weight: 500;
    font-size: 16px;
    &:hover {
      background-image: linear-gradient(45deg, #ff00aa, #3f35ff);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  @keyframes anime {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`
