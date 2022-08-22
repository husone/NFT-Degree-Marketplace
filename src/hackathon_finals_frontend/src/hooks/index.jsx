import { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
import { useConnect } from '@connect2ic/react'
import { useNavigate } from 'react-router-dom'

export const Context = createContext()

const Provider = ({ children }) => {
  const { principal, isConnected } = useConnect()
  const [role, setRole] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const TEST_ID = 2
    let role = checkRole(TEST_ID)
    setRole(role)
    console.log('principal: ' + principal)
  }, [principal])

  useEffect(() => {
    console.log('principal: ' + principal)
  }, [principal])

  const logout = () => {
    setRole('user')
    navigate('/', {
      replace: true,
    })
    console.log('logout')
    setRole(null)
  }

  const value = {
    role,
    logout,
    setRole,
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
