import { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
import { useConnect } from '@connect2ic/react'
import { useNavigate } from 'react-router-dom'
import { final_be } from '../../.././declarations/final_be'
import { Principal } from '@dfinity/principal'

export const Context = createContext()

const Provider = ({ children }) => {
  const { principal, isConnected, connect } = useConnect()
  const [role, setRole] = useState('user')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // const TEST_ID = 2
    // let role = checkRole(TEST_ID)
    if (principal) {
      setIsLoading(true)
      getRoleUser()
    }
    if (role) {
      setIsLoading(false)
    }
    console.log('principal: ' + principal)
    console.log('role: ' + role)
  }, [principal])

  useEffect(() => {
    if (!isConnected) {
      connectWallet()
    }
  }, [])

  const connectWallet = async () => {
    await connect('plug')
  }

  const getRoleUser = async () => {
    const res = await final_be.getRole(Principal.fromText(principal))
    setRole(Object.keys(res)[0].toLowerCase())
    setIsLoading(false)
  }

  const logout = () => {
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
    isLoading,
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
