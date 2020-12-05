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

  // const rows2 = descargas.map(row => {
  //   return {
  //     id: row.action_id,
  //     title: row.file.title,
  //     autor: row.file.autor,
  //     type: row.file.type,
  //     speed: row.speed,
  //     icon: row.file.icon()
  //   }
  // }
  // )
  // const columns = [
  //   { field: 'icon', width: 100 },
  //   { field: 'title', headerName: <Busqueda />, width: 270 },
  //   { field: 'autor', headerName: 'Autor', width: 230 },
  //   { field: 'type', headerName: 'Last name', width: 230 },
  //   { field: 'speed', headerName: 'Age', type: 'number', width: 290, },
  // ]

  useEffect(async () => {
    setPromedio(await downloadService.averageDownload(loggedUser.id) + ' MB/S')
  }, [])

  const searchDownloads = async (filtros, orden) => setDescargas(await downloadService.searchDownloadsOf(loggedUser.id, filtros, orden))

  const extraCell = () => 'Tasa de transferencia'

  const extraCellDate = (download) => download.speed + ' MB/s'

  return (
    // <div>
    //   {console.log(rows2)}
    //   {console.log(rows)}
    <TableActionsRouter
      tittle='Mis Descargas'
      actions={descargas}
      extraCell={extraCell}
      extraCellDate={extraCellDate}
      extraCellFilter="speed"
      buscar={searchDownloads}
      average={promedio}
    />

    /* <DataGrid
          rows={rows2}
          columns={columns}
          sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        loading={loading}
        /> */

    // </div>
  )
}

class descargasRow {
  constructor(title, autor, type, speed) {
    this.title = title
    this.autor = autor
    this.type = type
    this.speed = speed

  }
}