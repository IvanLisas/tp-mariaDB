import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { downloadService } from '../../../services/downloadService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'
import { Filtro } from '../../../domain/filtro'

export const Descargas = (props) => {
  const [descargas, setDescargas] = useState([])
  const [promedio, setPromedio] = useState('')
  const { loggedUser } = useContext(Context)

  useEffect(async () => {
    setPromedio(await downloadService.averageDownload(loggedUser.id) + ' MB/S')
  }, [])

  const searchDownloads = async (filtros) => setDescargas(await downloadService.searchDownloadsOf(loggedUser.id, filtros))

  const extraCell = () => 'Tasa de transferencia'

  const extraCellDate = (download) => download.speed + ' MB/s'

  return (
    <div>
      <TableActionsRouter
        tittle='Mis Descargas'
        actions={descargas}
        extraCell={extraCell}
        extraCellDate={extraCellDate}
        extraCellFilter="speed"
        buscar={searchDownloads}
        average={promedio}
      />
    </div>
  )
}