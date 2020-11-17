import React, { createContext, useState } from 'react'

export const Context = createContext()

export const Providers = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState()

  const value = {
    loggedUser,
    updateLoggedUser: (user) => setLoggedUser(user),
  }


  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}