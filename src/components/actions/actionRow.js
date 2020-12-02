import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'

export const ActionRow = ({ action, extraCellDate }) => {
  const file = action.file
  return (
    <TableRow key={file.id} >
      <TableCell>{file.icon()}
      </TableCell>
      <TableCell component="th" scope="row">
        {file.title}.{file.extension_type}
      </TableCell>
      <TableCell component="th" scope="row">
        {file.autor}
      </TableCell>
      <TableCell component="th" scope="row">
        {file.name()}
      </TableCell>
      <TableCell>
        {extraCellDate(action)}
      </TableCell>
      <TableCell>{action.date_init_format()}</TableCell>
    </TableRow>
  )
}
