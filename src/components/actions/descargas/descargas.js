import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { downloadService } from '../../../services/downloadService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'

export const Descargas = (props) => {
  const [textoBusqueda, setTextoBusqueda] = useState('')
  const [descargas, setDescargas] = useState([])
  const [promedio, setPromedio] = useState('')
  const { loggedUser } = useContext(Context)

  useEffect(async () => {
    setDescargas(await downloadService.allDownloads(loggedUser.id))
    setPromedio(await downloadService.averageDownload(loggedUser.id) + ' MB/S')
  }, [])

  const searchDownloads = async () => setDescargas(await downloadService.searchDownloadsOf(loggedUser.id, textoBusqueda))

  const downloadsByAscName = async () => setDescargas(await downloadService.downloadsByAscName(loggedUser.id))

  const downloadsByDesName = async () => setDescargas(await downloadService.downloadsByDesName(loggedUser.id))

  const extraCell = () => <TableCell>Tasa de transferencia</TableCell>

  const extraCellDate = (download) => <TableCell>{download.speed} MB/s</TableCell>

  return (
    <TableActionsRouter
      tittle='Mis Descargas'
      actions={descargas}
      extraCell={extraCell}
      extraCellDate={extraCellDate}
      sortByAscName={downloadsByAscName}
      sortByDesName={downloadsByDesName}
      average={promedio}
      textoBusqueda={textoBusqueda}
      setTextoBusqueda={setTextoBusqueda}
      buscar={searchDownloads}
    />
  )
}