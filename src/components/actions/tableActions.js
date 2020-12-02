import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'primereact/button'
import './tableActions.css'
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Panel } from 'primereact/panel'
import { ActionRow } from './actionRow'
import { Busqueda } from '../busqueda/busqueda'
import { Filtro } from '../../domain/filtro'

export const TableActions = (props) => {

  const [tituloBusqueda, setTituloBusqueda] = useState('')
  const [autorBusqueda, setAutorBusqueda] = useState('')
  const [tipoBusqueda, setTipoBusqueda] = useState('')
  const [extraCellBusqueda, setExtraCellBusqueda] = useState('')
  const [fechaBusqueda, setFechaBusqueda] = useState('')

  useEffect(async () => {
    let filtrosAux = []
    filtrosAux.push(new Filtro('title', tituloBusqueda))
    filtrosAux.push(new Filtro('username', autorBusqueda))
    filtrosAux.push(new Filtro('file.type', tipoBusqueda))
    filtrosAux.push(new Filtro(props.extraCellFilter, extraCellBusqueda))
    filtrosAux.push(new Filtro('date_init', fechaBusqueda))
    await props.buscar(filtrosAux)
  }, [tituloBusqueda, autorBusqueda, tipoBusqueda, fechaBusqueda, extraCellBusqueda])

  return (
    <div className='container'>
      {/* {console.log(props.actions)} */}
      <Panel header={props.tittle}>
        <div>
          <div className='busquda-container'>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell><Busqueda placeholder='Titulo' onChange={setTituloBusqueda} /></TableCell>
                <TableCell><Busqueda placeholder='Autor' onChange={setAutorBusqueda} /></TableCell>
                <TableCell><Busqueda placeholder='Tipo' onChange={setTipoBusqueda} /></TableCell>
                <TableCell><Busqueda placeholder={props.extraCell()} onChange={setExtraCellBusqueda} /></TableCell>
                <TableCell><Busqueda placeholder='Fecha de descarga' onChange={setFechaBusqueda} /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.actions.map((action) =>
                  <ActionRow
                    action={action}
                    extraCellDate={props.extraCellDate}
                  />)
              }
            </TableBody>
          </Table>
        </div>
      </Panel>
      <div class="Button-container">
        <Button className="p-button-raised buton" label="Volver" onClick={() => props.history.push('/inicio')} />
      </div>
    </div>
  )
}

export const TableActionsRouter = withRouter(TableActions)