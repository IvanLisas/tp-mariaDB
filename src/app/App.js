import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css'
import { MainRoutes } from '../routes/routes'
import { Providers } from '../context/context'
import 'primereact/resources/primereact.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'

export default function App() {

  const outerTheme = createMuiTheme({
    palette: {
      primary: {
        main: blue[500],
      },
    },
  })

  return (

    <Providers>

      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>

    </Providers>

  )
}

