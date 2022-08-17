import { createContext, useState, useEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
import { useConnect } from '@connect2ic/react'

export const Context = createContext()

const Provider = props => {
  const [prinpId, setprinpId] = useState(localStorage.getItem('prinpId'))
  const { principal, isConnected } = useConnect()
  const [role, setRole] = useState(null)

  useEffect(() => {
    console.log(prinpId)
    if (prinpId && principal) {
      // getUserInfo();
    }
  }, [prinpId, principal])

  const setPrinpId = value => {
    localStorage.setItem('prinpId', value)
    setprinpId(value)
  }

  const logout = () => {
    console.log('logout')
    setprinpId()
    localStorage.clear()
  }

  const value = {
    prinpId,
    setPrinpId,
    logout,
  }

  return <Context.Provider value={value}>{props.children}</Context.Provider>
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
