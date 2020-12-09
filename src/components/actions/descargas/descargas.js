import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { downloadService } from '../../../services/downloadService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'
import { Filtro } from '../../../domain/filtro'
import { DataGrid } from '@material-ui/data-grid'
import { Busqueda } from '../../busqueda/busqueda'

export const Descargas = (props) => {
  const [descargas, setDescargas] = useState([])
  const [promedio, setPromedio] = useState('')
  const { loggedUser } = useContext(Context)
  const [downloadsCount, setDownloadsCount] = useState([])

  const searchDownloads = async (filtros, orden, limit, offset) => {
    setDownloadsCount(await downloadService.countDownloands(loggedUser.id, filtros, orden))
    setDescargas(await downloadService.searchDownloadsOf(loggedUser.id, filtros, orden, limit, offset))
  }

  const extraCell = () => 'Velocidad'

  const extraCellDate = (download) => download.speed + ' MB/s'

  return (
    <TableActionsRouter
      tittle='Mis Descargas'
      actions={descargas}
      extraCell={extraCell}
      extraCellDate={extraCellDate}
      extraCellFilter="speed"
      buscar={searchDownloads}
      average={promedio}
      actionsCount={downloadsCount}
    />
  )
}