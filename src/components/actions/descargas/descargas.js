import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../../../context/context'
import { downloadService } from '../../../services/downloadService'
import { TableActionsRouter } from '../tableActions'
import TableCell from '@material-ui/core/TableCell'
import { Filtro } from '../../../domain/filtro'

export const Descargas = (props) => {
  const [tituloBusqueda, setTituloBusqueda] = useState('')
  const [autorBusqueda, setAutorBusqueda] = useState('')
  const [tipoBusqueda, setTipoBusqueda] = useState('')
  const [tasaBusqueda, setTasaBusqueda] = useState('')
  const [fechaBusqueda, setFechaBusqueda] = useState('')

  const [descargas, setDescargas] = useState([])
  const [promedio, setPromedio] = useState('')
  const { loggedUser } = useContext(Context)

  useEffect(async () => {
    setPromedio(await downloadService.averageDownload(loggedUser.id) + ' MB/S')
  }, [])

  useEffect(async () => {
    let filtrosAux = []
    filtrosAux.push(new Filtro('title', tituloBusqueda))
    filtrosAux.push(new Filtro('username', autorBusqueda))
    filtrosAux.push(new Filtro('file.type', tipoBusqueda))
    filtrosAux.push(new Filtro('speed', tasaBusqueda))
    filtrosAux.push(new Filtro('date_init', fechaBusqueda))
    await searchDownloads(filtrosAux)
  }, [tituloBusqueda, autorBusqueda, tipoBusqueda, fechaBusqueda, tasaBusqueda])

  const searchDownloads = async (filtrosAux) => setDescargas(await downloadService.searchDownloadsOf(loggedUser.id, filtrosAux))

  const extraCell = () => 'Tasa de transferencia'

  const extraCellDate = (download) => download.speed + ' MB/s'

  return (
    <div>
      <TableActionsRouter
        tittle='Mis Descargas'
        actions={descargas}
        extraCell={extraCell}
        extraCellDate={extraCellDate}
        average={promedio}
        setTituloBusqueda={setTituloBusqueda}
        setAutorBusqueda={setAutorBusqueda}
        setTipoBusqueda={setTipoBusqueda}
        setExtraBusqueda={setTasaBusqueda}
        setFechaBusqueda={setFechaBusqueda}
      />
    </div>
  )
}

// {
//   [
//     {
//       filtro: titutlo
//      palabra: compilado
//     },
//       filtro: autor
//       palabra: pepe
//    }
//   ],
// }

