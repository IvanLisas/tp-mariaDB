import React, { useEffect, useState, useContext } from 'react'
import './tableActions.css'
import { withRouter } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import Button from '@material-ui/core/Button'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Panel } from 'primereact/panel'
import { ActionRow } from './actionRow'
import { Busqueda } from '../busqueda/busqueda'
import { Filtro } from '../../domain/filtro'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowUpward'


export const TableActions = (props) => {

  const [tituloBusqueda, setTituloBusqueda] = useState('')
  const [autorBusqueda, setAutorBusqueda] = useState('')
  const [tipoBusqueda, setTipoBusqueda] = useState('')
  const [extraCellBusqueda, setExtraCellBusqueda] = useState('')
  const [fechaBusqueda, setFechaBusqueda] = useState('')

  const [tituloArrow, setTituloArrow] = useState()
  const [autorArrow, setAutorArrow] = useState()
  const [tipoArrow, setTipoBArrow] = useState()
  const [extraCellArrow, setExtraCellArrow] = useState()
  const [fechaArrow, setFechaArrow] = useState()

  const column = (placeholder, onChange, type) =>
    <TableCell>
      <div className='action-column'>
        <Busqueda placeholder={placeholder} onChange={onChange} type={type} />
        <Button>
          <span class="material-icons">
            arrow_upward
          </span>
        </Button>
      </div>
    </TableCell>

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
                {column('Titulo', setTituloBusqueda)}
                {column('Autor', setAutorBusqueda)}
                {column('Tipo', setTipoBusqueda)}
                {column(props.extraCell(), setExtraCellBusqueda)}
                {column('Fecha de descarga', setFechaBusqueda, 'date')}
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
    </div >
  )
}

export const TableActionsRouter = withRouter(TableActions)