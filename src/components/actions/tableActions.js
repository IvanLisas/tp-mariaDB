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
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'

export const TableActions = (props) => {

  const [orden, setOrden] = useState('DESC')
  const [columnSort, setColumnSort] = useState('date_init')

  const [tituloBusqueda, setTituloBusqueda] = useState('')
  const [autorBusqueda, setAutorBusqueda] = useState('')
  const [tipoBusqueda, setTipoBusqueda] = useState('')
  const [extraCellBusqueda, setExtraCellBusqueda] = useState('')
  const [fechaBusqueda, setFechaBusqueda] = useState('')

  const [tituloArrow, setTituloArrow] = useState('sort')
  const [autorArrow, setAutorArrow] = useState('sort')
  const [tipoArrow, setTipoArrow] = useState('sort')
  const [extraCellArrow, setExtraCellArrow] = useState('sort')
  const [fechaArrow, setFechaArrow] = useState('arrow_downward')

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleSort = async (field, arrow, setArrow) => {
    setTituloArrow('sort')
    setAutorArrow('sort')
    setTipoArrow('sort')
    setExtraCellArrow('sort')
    setFechaArrow('sort')
    if (arrow !== 'arrow_upward') {
      setArrow('arrow_upward')
      setOrden('ASC')
    } else {
      setArrow('arrow_downward')
      setOrden('DESC')
    }
    setColumnSort(field)

  }

  const handleChangePage = async (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const column = (placeholder, field, onChange, arrow, setArrow, type) =>
    <TableCell>
      <div className='action-column'>
        <Busqueda placeholder={placeholder} onChange={onChange} type={type} />
        <Button onClick={() => handleSort(field, arrow, setArrow)}>
          <span class="material-icons">
            {arrow}
          </span>
        </Button>
      </div>
    </TableCell>

  useEffect(async () => {
    setPage(0)
    await applyFilters()
  }, [tituloBusqueda, autorBusqueda, tipoBusqueda, fechaBusqueda, extraCellBusqueda, columnSort, orden, rowsPerPage])

  useEffect(async () => {
    await applyFilters()
  }, [page])

  const applyFilters = async () => {
    let filtrosAux = []
    filtrosAux.push(new Filtro('title', tituloBusqueda))
    filtrosAux.push(new Filtro('username', autorBusqueda))
    filtrosAux.push(new Filtro('file.type', tipoBusqueda))
    filtrosAux.push(new Filtro(props.extraCellFilter, extraCellBusqueda))
    filtrosAux.push(new Filtro('date_init', fechaBusqueda))
    await props.buscar(filtrosAux, {
      column: columnSort,
      orden: orden,
    }, rowsPerPage, (page) * rowsPerPage)

  }

  return (
    <div className='container'>
      <Panel header={props.tittle}>
        <div>
          <div className='busquda-container'>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {column('Titulo', 'title', setTituloBusqueda, tituloArrow, setTituloArrow)}
                {column('Autor', 'username', setAutorBusqueda, autorArrow, setAutorArrow)}
                {column('Tipo', 'file.type', setTipoBusqueda, tipoArrow, setTipoArrow)}
                {column(props.extraCell(), props.extraCellFilter, setExtraCellBusqueda, extraCellArrow, setExtraCellArrow)}
                {column('Fecha de descarga', 'date_init', setFechaBusqueda, fechaArrow, setFechaArrow, 'date')}
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
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All' }]}
                  colSpan={3}
                  count={props.actionsCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}

                />
              </TableRow>
            </TableFooter>
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