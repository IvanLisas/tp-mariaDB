import './editarPerfil.css'
import React, { useEffect, useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { userService } from '../../../services/userService'
import { Context } from '../../../context/context'

export const EditarPerfil = (props) => {
  const { loggedUser } = useContext(Context)
  const { updateLoggedUser } = useContext(Context)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [dni, setDni] = useState('')


  return (
    <div className='editar-perfil'>
      <div className='editar-perfil-container'>

        <div className='titulo-container'>
          Editar informacion personal
        </div>
        <div className='informacion-container'>
          <TextField
            defaultValue={loggedUser.username}
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Usuario"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />

          <TextField
            defaultValue={loggedUser.email}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            disable
          />
          <TextField
            defaultValue={loggedUser.dni}
            variant="outlined"
            required
            fullWidth
            id="dni"
            label="DNI"
            name="dni"
            type='number'
            onChange={(event) => setDni(event.target.value)}

          />
          <TextField
            defaultValue={loggedUser.name}
            autoComplete="fname"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Nombre"
            autoFocus
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            defaultValue={loggedUser.surname}
            variant="outlined"
            required
            fullWidth
            id="surname"
            label="Apellido"
            name="surname"
            onChange={(event) => setSurname(event.target.value)}
          />
        </div>
      </div>

    </div>

  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',


  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginBottom: '0',

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))
