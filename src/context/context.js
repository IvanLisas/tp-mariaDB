import React, { createContext, useState } from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

export const Context = createContext()

export const Providers = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState()
  const [busqueda, setBusqueda] = useState(' ')
  const value = {
    loggedUser,
    updateLoggedUser: (user) => setLoggedUser(user),
    busqueda,
    buscar: (texto) => setBusqueda(texto)
  }


  return (

    <Context.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </Context.Provider>

  )
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#9a0036'
    }
  },
})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})