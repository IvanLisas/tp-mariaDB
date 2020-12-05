import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { reproductionService } from '../../../services/reproductionService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'

export const Reproducciones = (props) => {
  const [reproduciones, setReproduciones] = useState([])
  const { loggedUser } = useContext(Context)

  const searchReproductions = async (filtros, orden) => setReproduciones(await reproductionService.searchReproductionsOf(loggedUser.id, filtros, orden))

  const extraCell = () => 'Sistema Operativo'

  const extraCellDate = (reproduction) => reproduction.os

  return (
    <div>
      <TableActionsRouter
        tittle='Mis Reproducciones'
        actions={reproduciones}
        extraCell={extraCell}
        extraCellDate={extraCellDate}
        extraCellFilter="os"
        buscar={searchReproductions}
      />
    </div>
  )
}