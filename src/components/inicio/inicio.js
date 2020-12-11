import './inicio.css'
import React, { useEffect, useState, useContext } from 'react'
import { fileService } from '../../services/fileService'
import { Context } from '../../context/context'

export const Inicio = () => {

  const { busqueda } = useContext(Context)
  // const [busqueda, setBusqueda] = useState(' ')
  const [files, setFiles] = useState(null)
  const column1 = []
  const column2 = []
  const column3 = []

  useEffect(async () => {
    setFiles(await fileService.searchFiles(busqueda))
  }, [busqueda])

  const createColumns = () => {
    for (var i = 0; i < files.length; i++) {
      if (i % 3 == 0) column1.push(files[i])
      if (i % 3 == 1) column2.push(files[i])
      if (i % 3 == 2) column3.push(files[i])
    }

  }

  return (
    <div>
      {files && createColumns()}
      <div className="inicio">
        <div className="column">
          {files && column1.map(file => file.card)}
        </div>
        <div className="column">
          {files && column2.map(file => file.card)}
        </div>
        <div className="column">
          {files && column3.map(file => file.card)}
        </div>
      </div>
    </div>
  )
}