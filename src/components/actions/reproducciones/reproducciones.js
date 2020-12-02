import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { reproductionService } from '../../../services/reproductionService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'

export const Reproducciones = (props) => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [reproducciones, setReproducciones] = useState([])
  const { loggedUser } = useContext(Context)

  useEffect(async () => setReproducciones(await reproductionService.searchReproductionsOf(loggedUser.id)), [])

  // const ordenar = async () => setDescargas(await downloadService.ordernar(loggedUser.id))

  // const ordenar2 = async () => setDescargas(await downloadService.ordernar2(loggedUser.id))

  // const promedio = async () => setPromedio(await downloadService.promedio(loggedUser.id) + ' MB/S')

  const extraCell = () => 'Sistema Operativo'

  const extraCellDate = (reproduction) => reproduction.os

  return (
    <TableActionsRouter
      tittle='Mis Reproducciones'
      actions={reproducciones}
      extraCell={extraCell}
      extraCellDate={extraCellDate}
      textoBusqueda={textoBusqueda}
      setTextoBusqueda={setTextoBusqueda}
    />
  )
}