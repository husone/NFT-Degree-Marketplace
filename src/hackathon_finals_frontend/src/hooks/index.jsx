import { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
import { useConnect } from '@connect2ic/react'
import { useNavigate } from 'react-router-dom'
import { final_be } from '../../.././declarations/final_be'
import { Principal } from '@dfinity/principal'
import axios from 'axios'

export const Context = createContext()

const Provider = ({ children }) => {
  const { principal, isConnected, connect, isConnecting } = useConnect()
  const [principalStorage, setPrincipalStorage] = useState(
    localStorage.getItem('prinp')
  )
  const [role, setRole] = useState('user')
  const [isLoaded, setIsLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (principal) {
      getRoleUser()
      setIsLoaded(true)
    }
    console.log('principal: ' + principal)
    console.log('role: ' + role)
  }, [principal, role])

  useEffect(() => {
    localStorage.clear()
    if (!isConnected) {
      connectWallet()
    }
    if (!principalStorage) {
      setIsLoaded(true)
    }
  }, [])

  const connectWallet = async () => {
    await connect('plug')
  }

  const getRoleUser = async () => {
    const res = await final_be.getRole(Principal.fromText(principal))
    setRole(Object.keys(res)[0].toLowerCase())
  }

  const login = () => {
    try {
      localStorage.setItem('prinp', principal)
      setPrincipalStorage(principal)
      navigate('/', {
        replace: true,
      })
      console.log('Connected to Plug')
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
