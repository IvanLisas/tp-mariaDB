import React, { createContext, useState } from 'react'

export const Context = createContext()

export const Providers = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState()
  const [log, setLog] = useState()

  const value = {
    loggedUser,
    updateLoggedUser: (user) => setLoggedUser(user),
    log,
    updateLog: (log) => setLog(log)
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}