import { createContext, useState, useEffect } from 'react'
import { checkRole } from '../Utils/CheckRole'
//create a context, with createContext api
export const RoleContext = createContext()

const RoleProvider = props => {
  const [role, setRole] = useState(null)

  return (
    <RoleContext.Provider value={[role, setRole]}>
      {props.children}
    </RoleContext.Provider>
  )
}

export default RoleProvider
