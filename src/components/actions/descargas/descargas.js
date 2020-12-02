import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { downloadService } from '../../../services/downloadService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'

export const Descargas = (props) => {
  const [tituloBusqueda, setTituloBusqueda] = useState('')
  const [autorBusqueda, setAutorBusqueda] = useState('')
  const [descargas, setDescargas] = useState([])
  const [promedio, setPromedio] = useState('')
  const { loggedUser } = useContext(Context)

  useEffect(async () => {
    setDescargas(await downloadService.allDownloads(loggedUser.id))
    setPromedio(await downloadService.averageDownload(loggedUser.id) + ' MB/S')
  }, [])

  useEffect(async () => searchDownloads(), [tituloBusqueda, autorBusqueda])

  const searchDownloads = async () => setDescargas(await downloadService.searchDownloadsOf(loggedUser.id, tituloBusqueda, autorBusqueda))

  const downloadsByAscName = async () => setDescargas(await downloadService.downloadsByAscName(loggedUser.id))

  const downloadsByDesName = async () => setDescargas(await downloadService.downloadsByDesName(loggedUser.id))

  const extraCell = () => 'Tasa de transferencia'

  const extraCellDate = (download) => download.speed + ' MB/s'

  return (
    <TableActionsRouter
      tittle='Mis Descargas'
      actions={descargas}
      extraCell={extraCell}
      extraCellDate={extraCellDate}
      sortByAscName={downloadsByAscName}
      sortByDesName={downloadsByDesName}
      average={promedio}
      tituloBusqueda={tituloBusqueda}
      autorBusqueda={autorBusqueda}
      setTituloBusqueda={setTituloBusqueda}
      setAutorBusqueda={setAutorBusqueda}
      buscar={searchDownloads}
    />
  )
}

// [
//   {
//     filtro:titutlo
//     palabra:compilado
//   },
//     filtro:autor
//     palabra: pepe
//   }
// ]

