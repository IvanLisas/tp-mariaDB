import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

export const TableRows = (props) => {
  const { elemento } = props
  return (
    <TableRow key={elemento.id} >
      {console.log(elemento)}
      <TableCell>{elemento.file.icon()}
      </TableCell>
      <TableCell component="th" scope="row">
        {elemento.file.title}.{elemento.file.extension_type}
      </TableCell>
      <TableCell component="th" scope="row">
        {elemento.file.name()}
      </TableCell>
      {!props.reproducion && <TableCell>{elemento.speed} MB/s</TableCell>}
      {props.reproducion && <TableCell>{elemento.os}</TableCell>}
      <TableCell>{elemento.accion.date_init_format()}</TableCell>
    </TableRow>
  )
}



