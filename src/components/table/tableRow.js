import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'
import DescriptionIcon from '@material-ui/icons/Description'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'

export const TableRows = (props) => {
  const { elemento } = props

  const iconTemplade = () => {
    if (elemento.file.type == 'music') return <QueueMusicIcon />
    if (elemento.file.type == 'document') return <DescriptionIcon />
    if (elemento.file.type == 'video') return <VideoLibraryIcon />
  }

  const typeTempleade = () => {
    if (elemento.file.type == 'music') return 'Musica'
    if (elemento.file.type == 'document') return 'Documento'
    if (elemento.file.type == 'video') return 'Video'
  }

  return (
    <TableRow key={elemento.id} >
      <TableCell>{iconTemplade()}
      </TableCell>
      <TableCell component="th" scope="row">
        {elemento.file.title}.{elemento.file.extension_type}
      </TableCell>
      <TableCell component="th" scope="row">
        {typeTempleade()}
      </TableCell>
      {!props.reproducion && <TableCell>{elemento.speed} MB/s</TableCell>}
      {props.reproducion && <TableCell>{elemento.os}</TableCell>}
      <TableCell>{elemento.accion.date_init_format()}</TableCell>
    </TableRow>
  )
}



