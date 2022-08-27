import { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/Images/logo.png'
import { ConnectButton, useConnect, ConnectDialog } from '@connect2ic/react'
import { withContext } from '../../hooks/index'
import NavbarEducation from './components/NavbarEducation'
import NavbarUser from './components/NavbarUser'
import NavbarAdmin from './components/NavbarAdmin'
import CoinLogo from '../../Assets/Images/DBZ.png'
import { Popover } from 'antd'
import { Principal } from '@dfinity/principal'
import { publicRoutes } from '../../Routes/index'
import './Navbar.scss'

import { idlFactory } from '../../../../declarations/dao/dao.did.js'
import { canisterId } from '../../../../declarations/dao/index.js'
function NavBar(props) {
  const { role, logout, login, balanceDIP20, setIsLoaded, connectWallet } =
    props
  const { principal, isConnected, disconnect, onConnect, onDisconnect } =
    useConnect()
  const send_dfx = () => {
    console.log('1')
  }
  const TRANSFER_ICP_TX = {
    idl: idlFactory,
    canisterId: canisterId,
    methodName: 'send_dfx',
    args: [
      {
        to: Principal.from(
          'e5uhc-kq6ct-dgmct-7x2zg-dnytg-kry5b-3rwpw-uuwqj-andm2-cmvis-nqe'
        ),
        fee: { e8s: BigInt(10000) },
        amount: { e8s: BigInt(1000000) },
        memo: BigInt(32),
        from_subaccount: [], // For now, using default subaccount to handle ICP
        created_at_time: [],
      },
    ],
    onSuccess: async res => {
      console.log('transferred icp successfully')
    },
    onFail: res => {
      console.log('transfer icp error', res)
    },
  }

  const randomTransfers = async () => {
    console.log('Doing a bunch of transfers')
    await window.ic.plug.batchTransactions([TRANSFER_ICP_TX])
    console.log('Done!')
  }
  const onConnectWallet = () => {
    // window.ic.plug.requestConnect()
    login()
  }

  const onDisconnected = () => {
    disconnect()
    logout()
    console.log('Disconnected from Plug')
  }

  const test = async () => {
    const result = await window.ic.plug.requestBalance()
    console.log(result)
  }

  const confirm = e => {
    setApprove(true)
  }

  const cancel = e => {
    console.log(e)
  }

  return (
    role && (
      <Container>
        <Nav className="navbar navbar-expand-lg ">
          <ConnectDialog />
          <div className="container-fluid px-5">
            <div className="d-flex align-items-center gap-4">
              <Link className="navbar-brand" to="/">
                <img src={Logo} alt="Home" />
              </Link>

              {role === 'user' && <NavbarUser />}
              {role === 'education' && <NavbarEducation />}
              {role === 'admin' && <NavbarAdmin />}
            </div>
            <div className="d-flex align-items-center h100">
              {principal && (
                <>
                  <div className="d-flex justify-content-center">
                    <div className="mx-3 d-flex align-items-center justify-content-center">
                      {balanceDIP20}
                      <img
                        className="coint_logo ms-1"
                        src={CoinLogo}
                        alt="coint logo"
                      />
                    </div>
                    <Popconfirm
                      title="Are you sure to delete this task?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                      className="cf_pop"
                    >
                      {!isApprove && (
                        <Button className="custom_approve_btn">Approve</Button>
                      )}
                    </Popconfirm>
                    {isApprove && (
                      <Tag color="green" className="custom_approve">
                        Approved
                      </Tag>
                    )}
                  </div>
                  <Popover
                    content={principal}
                    placement="top"
                    className="wallet_id mx-3 text-light"
                  >
                    <div className="wallet_id mx-3 text-light">{principal}</div>
                  </Popover>
                </>
              )}
              <ConnectButton
                onConnect={onConnectWallet}
                onDisconnect={onDisconnected}
              />
              <button onClick={randomTransfers}>test</button>
            </div>
          </div>
        </Nav>
      </Container>
    )
  )
}

export default withContext(NavBar)
const Nav = styled.nav`
  height: 80px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background: #06060e;
  position: sticky;
  top: 0px;
  z-index: 100;
  img {
    height: 50px;
  }
  .connect-button {
    color: #fff;
    border-radius: 100px;
    border: 0px;
    padding: 10px 18px;
    font-size: 18px;
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
    line-height: 29px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 3px solid #f62fbe;
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
    font-size: 20px;
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
const Container = styled.div`
  position: sticky;
  z-index: 100;
  top: 0px;
  .dialog-styles {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    margin-top: -100px;
    margin-left: -100px;
    background-color: #00000050;
    button {
      background-color: #fff;
      padding: 35px;
      border-radius: 10px;
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  .coint_logo {
    width: 20px;
    height: 20px;
    object-fit: cover;
  }
`
