import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'primereact/resources/themes/saga-blue/theme.css'
import { MainRoutes } from '../routes/routes'
import { Providers } from '../context/context'
import 'primereact/resources/primereact.css' 
export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </Providers>
  )
}