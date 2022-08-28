import { createContext, useState, useEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
import { useConnect, useCanister } from '@connect2ic/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { final_be } from '../../.././declarations/final_be'
import { Principal } from '@dfinity/principal'
import { ft } from '../../.././declarations/ft'

export const Context = createContext()

const Provider = ({ children }) => {
  let location = useLocation()

  const { principal, isConnected, connect, isConnecting } = useConnect()
  const [principalStorage, setPrincipalStorage] = useState(
    localStorage.getItem('prinp')
  )
  const [role, setRole] = useState('user')
  const [isLoaded, setIsLoaded] = useState(false)
  const [balanceDIP20, setBalanceDIP20] = useState('0 DBZ')
  const [isApproveGlobal, setIsApproveGlobal] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    console.log(process.env.DAO_WALLET)
    let timer = setTimeout(() => {
      if (!principal) {
        setIsLoaded(true)
      }
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (principal) {
      getRoleUser()
      getBalanceDIP20(principal)
      checkAllowance()
    }
    console.log('principal: ' + principal)
    console.log('role: ' + role)
    if (role && principal) {
      setIsLoaded(true)
    }
  }, [principal, role])

  const checkAllowance = async () => {
    console.log(process.env.DAO_WALLET)
    console.log(principal)
    const res = await ft.allowance(
      Principal.fromText(principal),
      Principal.fromText(process.env.DAO_WALLET)
    )
    console.log(res)
    if (Number(res) > 0) {
      setIsApproveGlobal(true)
    }
  }

  const getBalanceDIP20 = async principal => {
    const res = await ft.balanceOf(Principal.fromText(principal))
    setBalanceDIP20(`${Number(res).toString()} DBZ`)
  }
  const connectWallet = () => {
    // window.ic.plug.requestConnect()
    connect('plug')
  }

  const getRoleUser = async () => {
    const res = await final_be.getRole(Principal.fromText(principal))
    setRole(Object.keys(res)[0].toLowerCase())
  }

  const login = () => {
    try {
      localStorage.setItem('prinp', principal)
      setPrincipalStorage(principal)
      console.log('Connected to Plug')
      navigate(`${location.pathname}`, {
        replace: true,
      })
    } catch (e) {
      console.log(e)
    }
  }
  const logout = () => {
    localStorage.clear()
    setPrincipalStorage(null)
    setRole('user')
    navigate('/', {
      replace: true,
    })
    console.log('logout')
  }

  const value = {
    role,
    logout,
    setRole,
    isLoaded,
    login,
    balanceDIP20,
    setIsLoaded,
    connectWallet,
    isApproveGlobal,
    setIsApproveGlobal,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const withContext = Component => {
  return props => {
    return (
      <Context.Consumer>
        {globalState => {
          return <Component {...globalState} {...props} />
        }}
      </Context.Consumer>
    )
  }
}

export default Provider
