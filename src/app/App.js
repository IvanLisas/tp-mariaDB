import React, { useEffect, useState, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MainRoutes } from '../routes/routes'
import { Providers } from '../context/context'

export default function App() {


  return (
    <Providers>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </Providers>
  )
}