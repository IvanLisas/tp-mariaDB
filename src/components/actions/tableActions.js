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

export const TableActions = (props) => {

  return (
    <div className='container'>
      {console.log(props.actions)}
      <Panel header={props.tittle}>
        <div>
          <Busqueda buscar={props.buscar} onChange={props.setTextoBusqueda} />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Titulo</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Tipo</TableCell>
                {props.extraCell()}
                <TableCell>Fecha de descarga</TableCell>
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
      <div class="filtros">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={props.sortByAscName}
        >
          Ordenar por nombre ascedente
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={async () => await props.sortByDesName()}
        >
          Ordenar por nombre Descendente
        </Button>


        {props.average}

      </div>
    </div>
  )
}

export const TableActionsRouter = withRouter(TableActions)