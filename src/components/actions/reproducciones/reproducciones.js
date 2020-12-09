import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { reproductionService } from '../../../services/reproductionService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'

export const Reproducciones = (props) => {
  const [reproduciones, setReproduciones] = useState([])
  const { loggedUser } = useContext(Context)
  const [reproducionsCount, setReproducionsCount] = useState([])

  const searchReproductions = async (filtros, orden, limit, offset) => {
    setReproducionsCount(await reproductionService.countReproductions(loggedUser.id, filtros, orden))
    setReproduciones(await reproductionService.searchReproductionsOf(loggedUser.id, filtros, orden, limit, offset))
  }

  const extraCell = () => 'OS'

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
        actionsCount={reproducionsCount}
      />
    </div>
  )
}