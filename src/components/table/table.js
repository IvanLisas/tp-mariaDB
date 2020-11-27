import './table.css'
import React, { useEffect, useState, useContext } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Button } from 'primereact/button'
import { Busqueda } from '../busqueda/busqueda'
import { Panel } from 'primereact/panel'
import { TableRows } from './tableRow'
import { withRouter } from 'react-router-dom'

const Tables = (props) => {

  const volver = () => props.history.push('/inicio')

  return (
    <Panel className="contenedor-principal" header={props.titulo}>
      {/* {console.log(props.elementos[0].accion.id)} */}
      <div>
        {/* <Busqueda buscar={props.buscar} onChange={props.setTextoBusqueda} /> */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Titulo</TableCell>
              <TableCell>Tipo</TableCell>
              {!props.reproducion && <TableCell>Tasa de transferencia</TableCell>}
              {props.reproducion && <TableCell>Sistema operativo</TableCell>}
              <TableCell>Fecha de descarga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.elementos.map((elemento) =>
                <TableRows
                  elemento={elemento}
                  key={elemento.id}
                  reproducion={props.reproducion}
                />)
            }
          </TableBody>
        </Table>
      </div>
      <div class="Button-container">
        <Button className="p-button-raised buton" label="Volver" onClick={() => volver()} />
      </div>
    </Panel>
  )
}

export const TablesRouter = withRouter(Tables)